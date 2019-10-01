import { Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { ConnectionOptions } from 'mongoose';

export interface TypegooseConnectionOptions extends ConnectionOptions {
  connectionName?: string;
}

export interface TypegooseModuleOptions {
  uri: string;
  [key: string]: any;
}

export interface TypegooseOptionsFactory {
  createTypegooseOptions():
    | Promise<TypegooseModuleOptions>
    | TypegooseModuleOptions;
}

export interface TypegooseModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  connectionName?: string;
  useExisting?: Type<TypegooseOptionsFactory>;
  useClass?: Type<TypegooseOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<TypegooseModuleOptions> | TypegooseModuleOptions;
  inject?: any[];
}
