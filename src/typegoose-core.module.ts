import mongoose from 'mongoose';
import { models } from '@typegoose/typegoose/lib/internal/data';
import { DynamicModule, Global, Module, Provider, OnApplicationShutdown, Inject } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { TypegooseOptionsFactory, TypegooseModuleOptions, TypegooseModuleAsyncOptions, TypegooseConnectionOptions } from './typegoose-options.interface';
import { TYPEGOOSE_CONNECTION_NAME, TYPEGOOSE_MODULE_OPTIONS } from './typegoose.constants';
import { getConnectionToken } from './typegoose.utils';
import { deleteModel } from '@typegoose/typegoose';

@Global()
@Module({})
export class TypegooseCoreModule implements OnApplicationShutdown {
  constructor(
    @Inject(TYPEGOOSE_CONNECTION_NAME) private readonly connectionName: string,
    private readonly moduleRef: ModuleRef
  ) {}

  /**
   * Creates the connection to the mongo database for all the models to use.
   * @param uri the uri for the mongoose connection (example: mongodb://mongodb0.example.com:27017/admin). Read more [here](https://docs.mongodb.com/manual/reference/connection-string/).
   * @param options the options for the Typegoose connection. You may provide a custom connection name, via `connectionName`, for multiple connections (Read more about [multiple connections here](https://mongoosejs.com/docs/connections.html#options)). Read more about mongoose options [here](https://mongoosejs.com/docs/connections.html#options).
   * @internal
   */
  static forRoot(
    uri: string,
    options: TypegooseConnectionOptions = {}
  ): DynamicModule {
    const connectionName = getConnectionToken(options.connectionName);

    const connectionNameProvider = {
      provide: TYPEGOOSE_CONNECTION_NAME,
      useValue: connectionName
    };

    const connectionProvider = {
      provide: connectionName,
      useFactory: () => mongoose.createConnection(uri, options)
    };

    return {
      module: TypegooseCoreModule,
      providers: [connectionProvider, connectionNameProvider],
      exports: [connectionProvider]
    };
  }

  /**
   * Similar to `forRoot` but is asynchronous instead. Read more [here](https://github.com/kpfromer/nestjs-typegoose#async-mongoose-schema-options).
   * @param options the options for the Typegoose connection. You may provide a custom connection name, via `connectionName`, for multiple connections (Read more about [multiple connections here](https://mongoosejs.com/docs/connections.html#options)). Read more about mongoose options [here](https://mongoosejs.com/docs/connections.html#options).
   * @internal
   */
  static forRootAsync(options: TypegooseModuleAsyncOptions): DynamicModule {
    const connectionName = getConnectionToken(options.connectionName);

    const connectionNameProvider = {
      provide: TYPEGOOSE_CONNECTION_NAME,
      useValue: connectionName
    };

    const connectionProvider = {
      provide: connectionName,
      useFactory: (typegooseModuleOptions: TypegooseModuleOptions) => {
        const {
          uri,
          ...typegooseOptions
        } = typegooseModuleOptions;
        return mongoose.createConnection(uri, typegooseOptions);
      },
      inject: [TYPEGOOSE_MODULE_OPTIONS] // inject output of async config creator
    };
    const asyncProviders = this.createAsyncProviders(options);
    return {
      module: TypegooseCoreModule,
      imports: options.imports, // imports from async for root
      providers: [
        ...asyncProviders,
        connectionProvider,
        connectionNameProvider
      ],
      exports: [connectionProvider]
    };
  }

  /**
   * Creates the asynchronous providers handling the creation of the connection options needed for the providers.
   * @param options the provider options and connection name needed to create the asynchronous provider.
   * @internal
   */
  private static createAsyncProviders(options: TypegooseModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  /**
   * Creates the typegoose connection options provider.
   * @param options the provider options wrapping the typegoose connection options.
   * @internal
   */
  private static createAsyncOptionsProvider(options: TypegooseModuleAsyncOptions): Provider {
    if (options.useFactory) { // If a factory provider
      return {
        provide: TYPEGOOSE_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    } // else MongooseOptionsFactory
    return {
      provide: TYPEGOOSE_MODULE_OPTIONS,
      useFactory: async (optionsFactory: TypegooseOptionsFactory) =>
        await optionsFactory.createTypegooseOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }

  /**
   * Cleans up the connection and removes the models to prevent unintended usage.
   * @internal
   */
  async onApplicationShutdown() {
    const connection = this.moduleRef.get<any>(this.connectionName);

    if (connection) {
      await connection.close();
      [...models.entries()].reduce((array, [ key, model ]) => {
        if (model.db === connection) {
          array.push(key);
        }
        return array;
      }, []).forEach(deleteModel);
    }
  }
}
