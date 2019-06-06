import * as mongoose from 'mongoose';
import { DynamicModule, Global, Module, Provider, OnModuleDestroy, Inject } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { TypegooseOptionsFactory, TypegooseModuleOptions, TypegooseModuleAsyncOptions, TypegooseConnectionOptions } from 'typegoose-options.interface';
import { TYPEGOOSE_CONNECTION_NAME, TYPEGOOSE_MODULE_OPTIONS } from './typegoose.constants';
import { getConnectionToken } from './typegoose.utils';

@Global()
@Module({})
export class TypegooseCoreModule implements OnModuleDestroy {
  constructor(
    @Inject(TYPEGOOSE_CONNECTION_NAME) private readonly connectionName: string,
    private readonly moduleRef: ModuleRef
  ) {}

  static forRoot(
    uri: string,
    options: TypegooseConnectionOptions = {}
  ): DynamicModule {
    const connectionName = getConnectionToken(options.connectionName);

    const connectionNameProvider = {
      provide: TYPEGOOSE_CONNECTION_NAME,
      useValue: connectionName
    }

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

  static forRootAsync(options: TypegooseModuleAsyncOptions): DynamicModule {
    const connectionName = getConnectionToken(options.connectionName);

    const connectionNameProvider = {
      provide: TYPEGOOSE_CONNECTION_NAME,
      useValue: connectionName
    }

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

  async onModuleDestroy() {
    const connection = this.moduleRef.get<any>(this.connectionName);

    if (connection) {
      await connection.close();
    }
  }
}