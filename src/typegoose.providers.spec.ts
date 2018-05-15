import { prop, Typegoose } from 'typegoose';
import { createTypegooseProviders } from './typegoose.providers';
import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { Mockgoose } from 'mockgoose';
import any = jasmine.any;

const mockgoose: Mockgoose = new Mockgoose(mongoose);

class MockUser extends Typegoose {
  @prop()
  name: string;
}

class MockTask extends Typegoose {
  @prop()
  description: string;
}

describe('createTypegooseProviders', () => {
  let connection: Connection;

  beforeAll(async () => {
    jest.setTimeout(120000);
    await mockgoose.prepareStorage();

    connection = await mongoose.createConnection('mongodb://foobar/baz');
    setTimeout(() => {
      connection.close(err =>{
        if(err) return console.log(err);
        console.log('disconnected');
      });
    }, 60000);

  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create typegoose providers from models', () => {

    jest.setTimeout(30000);

    const models = [
      MockUser,
      MockTask
    ];

    const providers = createTypegooseProviders(models);

    expect(providers).toEqual([
      {
        provide: 'MockUserModel',
        useFactory: any(Function),
        inject: ['DbConnectionToken']
      },
      {
        provide: 'MockTaskModel',
        useFactory: any(Function),
        inject: ['DbConnectionToken']
      }
    ]);

    const userProvider = providers[0];

    const model = userProvider.useFactory(connection);

    expect(model.prototype.model).toBeTruthy();
  }, 15000);

  it('should create no providers if no models are given', () => {
    const providers = createTypegooseProviders();

    expect(providers).toEqual([]);
  });

  afterAll(() => {
    connection.close();
  })
});