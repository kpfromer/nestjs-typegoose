import { Inject } from '@nestjs/common';
import { Typegoose } from '@typegoose/typegoose';
import { TypegooseClass } from './typegoose-class.interface';
import { getModelToken } from './typegoose.utils';

export const InjectModel = <T extends Typegoose>(model: TypegooseClass<T>) =>
  Inject(getModelToken(model.name));
