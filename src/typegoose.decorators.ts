import { Inject } from '@nestjs/common';
import { TypegooseClass } from './typegoose-class.interface';
import { getModelToken } from './typegoose.utils';

export const InjectModel = (model: TypegooseClass) =>
  Inject(getModelToken(model.name));
