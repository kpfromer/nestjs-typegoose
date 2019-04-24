import * as mongoose from 'mongoose';
import { ConnectionOptions } from 'mongoose';
import { DynamicModule, Global, Module, Provider, OnModuleDestroy } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { TypegooseOptionsFactory, TypegooseModuleOptions, TypegooseModuleAsyncOptions } from 'typegoose-options.interface';

@Global()
@Module({})
export class TypegooseCoreModule implements OnModuleDestroy {
  constructor(private readonly moduleRef: ModuleRef) {}

  static forRoot(
    uri: string,
    options: ConnectionOptions = {},
  ): DynamicModule {
    const connectionProvider = {
      provide: 'DbConnectionToken',
      useFactory: () => mongoose.createConnection(uri, options)
    };
    return {
      module: TypegooseCoreModule,
      providers: [connectionProvider],
      exports: [connectionProvider]
    };
  }

  static forRootAsync(options: TypegooseModuleAsyncOptions): DynamicModule {
    const connectionProvider = {
      provide: 'DbConnectionToken',
      useFactory: (typegooseModuleOptions: TypegooseModuleOptions) => {
        const {
          uri,
          ...typegooseOptions
        } = typegooseModuleOptions;
        return mongoose.createConnection(uri, typegooseOptions);
      },
      inject: ['TYPEGOOSE_MODULE_OPTIONS'] // inject output of async config creator
    };
    const asyncProviders = this.createAsyncProviders(options);
    return {
      module: TypegooseCoreModule,
      imports: options.imports, // imports from async for root
      providers: [
        ...asyncProviders,
        connectionProvider
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
        provide: 'TYPEGOOSE_MODULE_OPTIONS',
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    } // else MongooseOptionsFactory
    return {
      provide: 'TYPEGOOSE_MODULE_OPTIONS',
      useFactory: async (optionsFactory: TypegooseOptionsFactory) =>
        await optionsFactory.createTypegooseOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }

  async onModuleDestroy() {
    const connection = this.moduleRef.get<any>('DbConnectionToken');

    if (connection) {
      await connection.close();
    }
  }
}