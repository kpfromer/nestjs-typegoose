import { Typegoose } from '@typegoose/typegoose';

export interface TypegooseClass<T extends Typegoose> {
  new (...args: any[]): T;
}
