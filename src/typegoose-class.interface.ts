import { Typegoose } from '@hasezoey/typegoose';

export interface TypegooseClass<T extends Typegoose> {
  new (...args: any[]): T;
}
