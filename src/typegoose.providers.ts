import {getModelToken} from './typegoose.utils';
import {TypegooseClass} from './typegoose-class.interface';
import {Connection} from 'mongoose';

export function createTypegooseProviders(models: TypegooseClass<any>[] = []) {
  return models.map((typegooseClass: TypegooseClass<any>) => ({
    provide: getModelToken(typegooseClass.name),
    useFactory: (connection: Connection) => new typegooseClass().getModelForClass(typegooseClass, {existingConnection: connection}),
    inject: ['DbConnectionToken']
  }));
}