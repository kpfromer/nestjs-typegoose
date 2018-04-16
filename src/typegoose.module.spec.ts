import { TypegooseModule } from './typegoose.module';
import { TypegooseCoreModule as CoreModule } from './typegoose-core.module';
import { prop, Typegoose } from 'typegoose';
import * as createProviders from './typegoose.providers';

class MockTask extends Typegoose {
  @prop()
  description: string;
}

class MockUser extends Typegoose {
  @prop()
  name: string;
}


describe('TypegooseModule', () => {

  describe('forRoot', () => {
    it('should call global CoreModule forRoot', () => {
      jest.spyOn(CoreModule, 'forRoot').mockImplementation(() => ({
        providers: 'DbConnection'
      }));

      const module = TypegooseModule.forRoot('mongourl', {db: 'db settings'});

      expect(module).toEqual({
        module: TypegooseModule,
        imports: [
          {
            providers: 'DbConnection'
          }
        ]
      });

      expect(CoreModule.forRoot).toHaveBeenCalledWith('mongourl', {db: 'db settings'})
    });

    it('should call global CoreModule forRoot with empty config', () => {
      jest.spyOn(CoreModule, 'forRoot').mockImplementation(() => ({
        providers: 'DbConnection'
      }));

      TypegooseModule.forRoot('mongourl');

      expect(CoreModule.forRoot).toHaveBeenCalledWith('mongourl', {});
    });
  });

  describe('forFeature', () => {
    it('should return module that exports providers for Models', () => {
      jest.spyOn(createProviders, 'createTypegooseProviders')
        .mockImplementation(modelArray => modelArray.map(model => model.name));

      const module = TypegooseModule.forFeature(MockTask, MockUser);

      const expectedProviders = [
        'MockTask',
        'MockUser'
      ];

      expect(module).toEqual({
        module: TypegooseModule,
        components: expectedProviders,
        exports: expectedProviders
      });
    });
  })
});