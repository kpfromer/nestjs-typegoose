import { Type } from '@nestjs/common'
import { ModuleMetadata } from '@nestjs/common/interfaces'
import { ConnectOptions } from 'mongoose';

export interface TypegooseConnectionOptions extends ConnectOptions, Record<string, any> {
  connectionName?: string
  /** Set to false to [disable buffering](http://mongoosejs.com/docs/faq.html#callback_never_executes) on all models associated with this connection. */
  bufferCommands?: boolean
  /** The name of the database you want to use. If not provided, Mongoose uses the database name from connection string. */
  dbName?: string
  /** username for authentication, equivalent to `options.auth.user`. Maintained for backwards compatibility. */
  user?: string
  /** password for authentication, equivalent to `options.auth.password`. Maintained for backwards compatibility. */
  pass?: string
  /** Set to false to disable automatic index creation for all models associated with this connection. */
  autoIndex?: boolean
  /** Set to `true` to make Mongoose automatically call `createCollection()` on every model created on this connection. */
  autoCreate?: boolean

  uri?: string;
  retryAttempts?: number;
  retryDelay?: number;
}

export interface TypegooseModuleOptions {
  uri?: string;
  retryAttempts?: number;
  retryDelay?: number;
  connectionName?: string;
  bufferCommands?: boolean
  dbName?: string
  user?: string
  pass?: string
  autoIndex?: boolean
  autoCreate?: boolean
}

export interface TypegooseOptionsFactory {
  createTypegooseOptions (): Promise<TypegooseModuleOptions> | TypegooseModuleOptions
}

export interface TypegooseModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  connectionName?: string
  useExisting?: Type<TypegooseOptionsFactory>
  useClass?: Type<TypegooseOptionsFactory>
  useFactory?: (...args: any[]) => Promise<TypegooseModuleOptions> | TypegooseModuleOptions
  inject?: any[]
}
