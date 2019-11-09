import { getModelToken, getConnectionToken } from './typegoose.utils';
import { TypegooseClass } from './typegoose-class.interface';
import { Connection, SchemaOptions } from 'mongoose';
import { getModelForClass } from '@typegoose/typegoose';
import { isClass } from 'is-class';

export interface TypegooseClassWithOptions {
  typegooseClass: TypegooseClass;
  schemaOptions?: SchemaOptions;
}

export const isTypegooseClassWithOptions = (item): item is TypegooseClassWithOptions =>
  isClass(item.typegooseClass);

export const convertToTypegooseClassWithOptions = (item: TypegooseClass | TypegooseClassWithOptions): TypegooseClassWithOptions => {
  if (isClass(item)) {
    return {
      typegooseClass: item as TypegooseClass
    };
  } else if (isTypegooseClassWithOptions(item)) {
    return item;
  }

  throw new Error('Invalid model object');
};

export function createTypegooseProviders(connectionName: string, models: TypegooseClassWithOptions[] = []) {
  return models.map(({ typegooseClass, schemaOptions = {} }) => ({
    provide: getModelToken(typegooseClass.name),
    useFactory: (connection: Connection) => getModelForClass(typegooseClass, {
      existingConnection: connection,
      schemaOptions
    }),
    inject: [getConnectionToken(connectionName)]
  }));
}
