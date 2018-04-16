import {prop, Typegoose} from 'typegoose';
import * as nest from '@nestjs/common';
import {InjectModel} from './typegoose.decorators';

jest.mock('@nestjs/common', () => ({
  Inject: jest.fn()
}));

class MockUser extends Typegoose {
  @prop()
  name: string;
}

describe('InjectModel', () => {
  it('should inject the model', () => {
    InjectModel(MockUser);

    expect(nest.Inject).toHaveBeenCalledWith('MockUserModel');
  });
});