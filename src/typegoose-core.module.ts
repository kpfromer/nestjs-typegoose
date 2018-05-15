import * as mongoose from 'mongoose';
import { ConnectionOptions } from 'mongoose';
import { DynamicModule, Global, Module } from '@nestjs/common';

@Global()
@Module({})
export class TypegooseCoreModule {
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
}