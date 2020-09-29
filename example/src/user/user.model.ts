import { prop, arrayProp, Ref } from '@typegoose/typegoose';
import { Cat } from 'src/cat/cat.model';

export class User {
  @prop({ required: true })
  public name: string;

  @arrayProp({ required: true, items: Cat })
  public cats: Ref<Cat>;
}
