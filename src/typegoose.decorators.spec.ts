import { prop } from '@typegoose/typegoose';
import * as nest from '@nestjs/common';
import { InjectModel } from './typegoose.decorators';

jest.mock('@nestjs/common', () => ({
  Inject: jest.fn()
}));

class MockUser {
  @prop()
  name: string;
}

describe('InjectModel', () => {
  it('should inject the model', () => {
    InjectModel(MockUser);

    expect(nest.Inject).toHaveBeenCalledWith('MockUserModel');
  });
});
