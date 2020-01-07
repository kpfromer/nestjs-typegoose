import { prop } from '@typegoose/typegoose';
import { IsString } from 'class-validator';

export class Cat {
  @IsString()
  @prop({ required: true })
  name: string;
}
