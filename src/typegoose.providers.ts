import { getModelToken } from './typegoose.utils';
import { TypegooseClass } from './typegoose-class.interface';
import { Connection, SchemaOptions } from 'mongoose';
import * as isClass from 'is-class';

export type TypegooseClassWithOptions = {
  typegooseClass: TypegooseClass<any>,
  schemaOptions?: SchemaOptions
}

export const isTypegooseClassWithOptions = (item): item is TypegooseClassWithOptions =>
  isClass(item.typegooseClass);

export const convertToTypegooseClassWithOptions = (item: TypegooseClass<any> | TypegooseClassWithOptions): TypegooseClassWithOptions => {
  if (isClass(item)) {
    return {
      typegooseClass: item as TypegooseClass<any>
    };
  } else if (isTypegooseClassWithOptions(item)) {
    return item;
  }

  throw new Error('Invalid model object');
};

export function createTypegooseProviders(models: TypegooseClassWithOptions[] = []) {
  return models.map(({ typegooseClass, schemaOptions = {} }) => ({
    provide: getModelToken(typegooseClass.name),
    useFactory: (connection: Connection) => new typegooseClass().setModelForClass(typegooseClass, {
      existingConnection: connection,
      schemaOptions
    }),
    inject: ['DbConnectionToken']
  }));
}