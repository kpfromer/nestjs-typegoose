import { DynamicModule, Module } from '@nestjs/common';
import { TypegooseCoreModule } from './typegoose-core.module';
import { createTypegooseProviders, convertToTypegooseClassWithOptions } from './typegoose.providers';
import { TypegooseClass, TypegooseClassWithOptions } from './typegoose-class.interface';
import { TypegooseConnectionOptions, TypegooseModuleAsyncOptions } from './typegoose-options.interface';

@Module({})
export class TypegooseModule {
  /**
   * Creates the connection to the mongo database for all the models to use.
   * @param uri the uri for the mongoose connection (example: mongodb://mongodb0.example.com:27017/admin). Read more [here](https://docs.mongodb.com/manual/reference/connection-string/).
   * @param options the options for the Typegoose connection. You may provide a custom connection name, via `connectionName`, for multiple connections (Read more about [multiple connections here](https://mongoosejs.com/docs/connections.html#options)). Read more about mongoose options [here](https://mongoosejs.com/docs/connections.html#options).
   */
  static forRoot(
    uri: string,
    options: TypegooseConnectionOptions = {},
  ): DynamicModule {
    return {
      module: TypegooseModule,
      imports: [TypegooseCoreModule.forRoot(uri, options)],
    };
  }

  /**
   * Similar to `forRoot` but is asynchronous instead. Read more [here](https://github.com/kpfromer/nestjs-typegoose#async-mongoose-schema-options).
   * @param options the options for the Typegoose connection. You may provide a custom connection name, via `connectionName`, for multiple connections (Read more about [multiple connections here](https://mongoosejs.com/docs/connections.html#options)). Read more about mongoose options [here](https://mongoosejs.com/docs/connections.html#options).
   */
  static forRootAsync(options: TypegooseModuleAsyncOptions): DynamicModule {
    return {
      module: TypegooseModule,
      imports: [TypegooseCoreModule.forRootAsync(options)],
    };
  }

  /**
   * Provides models for injection into services.
   * @param models the list of models to provide to services.
   * @param connectionName the connection name for use with multiple connections.
   */
  static forFeature(models: (TypegooseClass | TypegooseClassWithOptions)[], connectionName?: string): DynamicModule {
    const convertedModels = models.map(model => convertToTypegooseClassWithOptions(model));
    const providers = createTypegooseProviders(connectionName, convertedModels);
    return {
      module: TypegooseModule,
      providers,
      exports: providers
    };
  }
}
