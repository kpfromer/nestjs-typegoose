import { TypegooseCoreModule } from './typegoose-core.module';
import * as mongoose from 'mongoose';
import any = jasmine.any;


describe('TypegooseCoreModule', () => {
  describe('forRoot', () => {
    it('should return module that provides mongoose connection', () => {

      const connection = 'i am a connection';

      jest.spyOn(mongoose, 'createConnection').mockReturnValue(connection);

      const module = TypegooseCoreModule.forRoot('mongouri', {authdb: 'mongo connection'});

      const connectionProvider = {
        provide: 'DbConnectionToken',
        useFactory: any(Function)
      };

      expect(module).toEqual({
        module: TypegooseCoreModule,
        components: [connectionProvider],
        exports: [connectionProvider]
      });

      const dbProvider = module.exports[0];

      expect(dbProvider.useFactory()).toBe(connection);
    });

    it('should create connection with no mongoose config', () => {
      const connection = 'i am a connection';

      jest.spyOn(mongoose, 'createConnection').mockReturnValue(connection);

      const module = TypegooseCoreModule.forRoot('mongouri');

      module.exports[0].useFactory();

      expect(mongoose.createConnection).toHaveBeenCalledWith('mongouri', {});
    });
  });
});