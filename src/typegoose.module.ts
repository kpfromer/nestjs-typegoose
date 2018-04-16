import { DynamicModule, Module } from '@nestjs/common';
import { TypegooseCoreModule } from './typegoose-core.module';
import { createTypegooseProviders } from './typegoose.providers';
import { TypegooseClass } from './typegoose-class.interface';
import { ConnectionOptions } from 'mongoose';

@Module({})
export class TypegooseModule {
  static forRoot(
    uri: string,
    options: ConnectionOptions = {},
  ): DynamicModule {
    return {
      module: TypegooseModule,
      imports: [TypegooseCoreModule.forRoot(uri, options)],
    };
  }

  static forFeature(...models: TypegooseClass<any>[]): DynamicModule {
    const providers = createTypegooseProviders(models);
    return {
      module: TypegooseModule,
      components: providers,
      exports: providers
    };
  }
}