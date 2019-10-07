import { TypegooseModule } from './typegoose.module';
import { TypegooseCoreModule as CoreModule } from './typegoose-core.module';
import { prop } from '@typegoose/typegoose';
import * as createProviders from './typegoose.providers';

class MockTask {
  @prop()
  description: string;
}

class MockUser {
  @prop()
  name: string;
}

describe('TypegooseModule', () => {

  describe('forRoot', () => {
    it('should call global CoreModule forRoot', () => {
      jest.spyOn(CoreModule, 'forRoot').mockImplementation(() => ({
        providers: 'DbConnection'
      } as any));

      const module = TypegooseModule.forRoot('mongourl', {db: 'db settings'});

      expect(module).toEqual({
        module: TypegooseModule,
        imports: [
          {
            providers: 'DbConnection'
          }
        ]
      });

      expect(CoreModule.forRoot).toHaveBeenCalledWith('mongourl', {db: 'db settings'});
    });

    it('should call global CoreModule forRoot with empty config', () => {
      jest.spyOn(CoreModule, 'forRoot').mockImplementation(() => ({
        providers: 'DbConnection'
      } as any));

      TypegooseModule.forRoot('mongourl');

      expect(CoreModule.forRoot).toHaveBeenCalledWith('mongourl', {});
    });
  });

  describe('forRootAsync', () => {
    it('should call global CoreModule forRoot', () => {
      jest.spyOn(CoreModule, 'forRootAsync').mockImplementation(() => ({
        providers: 'DbConnection'
      } as any));

      const options = {
        useFactory: () => {
          return {
            uri: 'mongourl',
            db: 'db settings'
          };
        }
      };

      const module = TypegooseModule.forRootAsync(options);

      expect(module).toEqual({
        module: TypegooseModule,
        imports: [
          {
            providers: 'DbConnection'
          }
        ]
      });

      expect(CoreModule.forRootAsync).toHaveBeenCalledWith(options);
    });
  });

  describe('forFeature', () => {
    let models, convertedModels;
    beforeEach(() => {
      models = [
        MockTask,
        {
          typegooseClass: MockUser,
          schemaOptions: {
            collection: 'differentCollectionNameUser'
          }
        }
      ];

      let count = -1;
      convertedModels = [
        'convertedTask',
        'convertedUser'
      ];

      jest.spyOn(createProviders, 'convertToTypegooseClassWithOptions')
        .mockImplementation(() => {
          count += 1;
          return convertedModels[count];
        });

      jest.spyOn(createProviders, 'createTypegooseProviders')
        .mockReturnValue('createdProviders' as any);
    });

    it('should return module that exports providers for models', () => {
      const module = TypegooseModule.forFeature(models);

      const expectedProviders = 'createdProviders';

      expect(createProviders.convertToTypegooseClassWithOptions).toHaveBeenCalledWith(MockTask);
      expect(createProviders.convertToTypegooseClassWithOptions).toHaveBeenCalledWith({
        typegooseClass: MockUser,
        schemaOptions: {
          collection: 'differentCollectionNameUser'
        }
      });

      expect(createProviders.createTypegooseProviders).toHaveBeenCalledWith(undefined, convertedModels);
      expect(module).toEqual({
        module: TypegooseModule,
        providers: expectedProviders,
        exports: expectedProviders
      });
    });

    it('should return module that createdTypegooseProviders with provided connectionName', () => {
      const connectionName = 'OtherMongoDB';

      const module = TypegooseModule.forFeature(models, connectionName);

      expect(createProviders.createTypegooseProviders).toHaveBeenCalledWith(connectionName, convertedModels);
    });
  });
});
