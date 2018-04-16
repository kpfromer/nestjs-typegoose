import {Typegoose} from 'typegoose';

export interface TypegooseClass<T extends Typegoose> {
  new (...args: any[]): T;
}