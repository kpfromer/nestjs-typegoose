import { prop, Typegoose } from '@typegoose/typegoose';
import { convertToTypegooseClassWithOptions, createTypegooseProviders } from './typegoose.providers';
import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { Mockgoose } from 'mockgoose';
import { DEFAULT_DB_CONNECTION_NAME, TYPEGOOSE_MODULE_OPTIONS, TYPEGOOSE_CONNECTION_NAME } from './typegoose.constants';
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

  describe('setModelForClass', () => {
    let mockSetModel, MockTypegooseClass, mockConnection, schemaOptions, provider;
    beforeEach(() => {
      mockSetModel = jest.fn();
      MockTypegooseClass = jest.fn().mockImplementation(() => ({
        setModelForClass: mockSetModel
      }));
      mockConnection = jest.fn() as any;

      schemaOptions = {
        collection: 'newCollectionName'
      };

      const models = [
        {
          typegooseClass: MockTypegooseClass,
          schemaOptions
        }
      ];

      ([ provider ] = createTypegooseProviders(DEFAULT_DB_CONNECTION_NAME, models));
      provider.useFactory(mockConnection);
    });

    it('should setup the database model', () => {
      expect(mockSetModel).toHaveBeenCalled();
    });

    it('should use existing connection from DbConnectionToken', () => {
      expect(mockSetModel.mock.calls[0][1]).toEqual(expect.objectContaining({
        existingConnection: mockConnection
      }));
    });

    it('should forward schema options to typegoose', () => {
      expect(mockSetModel.mock.calls[0][1]).toEqual(expect.objectContaining({
        schemaOptions
      }));
    });
  });


  it('should create typegoose providers from models', () => {

    jest.setTimeout(30000);

    const models = [
      {
        typegooseClass: MockUser
      },
      {
        typegooseClass: MockTask
      }
    ];

    const providers = createTypegooseProviders(DEFAULT_DB_CONNECTION_NAME, models);

    expect(providers).toEqual([
      {
        provide: 'MockUserModel',
        useFactory: any(Function),
        inject: [DEFAULT_DB_CONNECTION_NAME]
      },
      {
        provide: 'MockTaskModel',
        useFactory: any(Function),
        inject: [DEFAULT_DB_CONNECTION_NAME]
      }
    ]);

    const userProvider = providers[0];

    const model = userProvider.useFactory(connection);

    expect(model.prototype.model).toBeTruthy();
  }, 15000);

  it('should create no providers if no models are given', () => {
    const providers = createTypegooseProviders(DEFAULT_DB_CONNECTION_NAME);

    expect(providers).toEqual([]);
  });

  afterAll(() => {
    connection.close();
  })
});

class MockTypegooseClass {}

describe('convertToTypegooseClassWithOptions', () => {
  it('returns model as typegooseClass if it is just a class', () => {
    expect(convertToTypegooseClassWithOptions(MockTypegooseClass)).toEqual({
      typegooseClass: MockTypegooseClass
    });
  });
  it('returns model and schemaOptions if it is a TypegooseClassWithOptions', () => {
    const options = {
      collection: 'differentName'
    };

    const expected = {
      typegooseClass: MockTypegooseClass,
      schemaOptions: options
    };

    expect(convertToTypegooseClassWithOptions(expected)).toEqual(expected);
  });
  it('throws error is not a class or not a TypegooseClassWithOptions', () => {
    const handler = () => {
      expect(convertToTypegooseClassWithOptions({
        // @ts-ignore
        something: 'different'
      }))
    };

    expect(handler).toThrowErrorMatchingSnapshot();
  });
});
