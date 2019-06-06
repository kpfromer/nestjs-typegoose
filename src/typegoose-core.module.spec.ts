import { TypegooseCoreModule } from './typegoose-core.module';
import * as mongoose from 'mongoose';
import { DEFAULT_DB_CONNECTION_NAME, TYPEGOOSE_MODULE_OPTIONS, TYPEGOOSE_CONNECTION_NAME } from './typegoose.constants';
import { DynamicModule } from '@nestjs/common';
import { FactoryProvider, ClassProvider, OnModuleDestroy } from '@nestjs/common/interfaces';

describe('TypegooseCoreModule', () => {
  describe('forRoot', () => {
    it('should return module that provides a mongoose connection', () => {
      const connection = 'i am a connection';

      jest.spyOn(mongoose, 'createConnection').mockReturnValue(connection);

      const module = TypegooseCoreModule.forRoot('mongouri', {authdb: 'mongo connection'});

      const connectionNameProvider = {
        provide: TYPEGOOSE_CONNECTION_NAME,
        useValue: DEFAULT_DB_CONNECTION_NAME
      }

      const connectionProvider = {
        provide: DEFAULT_DB_CONNECTION_NAME,
        useFactory: expect.any(Function)
      };

      expect(module).toEqual({
        module: TypegooseCoreModule,
        providers: [connectionProvider, connectionNameProvider],
        exports: [connectionProvider]
      });

      const dbProvider = module.exports[0] as FactoryProvider;

      expect(dbProvider.useFactory()).toBe(connection);
    });

    it('should create connection with no mongoose config', () => {
      const connection = 'i am a connection';

      jest.spyOn(mongoose, 'createConnection').mockReturnValue(connection);

      const module = TypegooseCoreModule.forRoot('mongouri');

      (module.exports[0] as FactoryProvider).useFactory();

      expect(mongoose.createConnection).toHaveBeenCalledWith('mongouri', {});
    });
  });
  describe('forAsyncRoot', () => {
    let connection, mockOptionFactory, wantedDependencies, module: DynamicModule;

    beforeEach(() => {
      connection = 'i am a connection';

      jest.spyOn(mongoose, 'createConnection').mockReturnValue(connection);

      mockOptionFactory = jest.fn();
      wantedDependencies = ['CONFIG_SERVICE'];
    });

    describe('Connection Name', () => {
      let DbConnectionToken: FactoryProvider;
      beforeEach(() => {
        module = TypegooseCoreModule.forRootAsync({
          useFactory: () => 'testing'
        });
        DbConnectionToken = module.exports[0] as FactoryProvider;
      });
      it('is the only export of the returned module', () => {
        expect(module.exports.length).toBe(1);
        expect(module.exports[0]).toMatchObject({
          provide: DEFAULT_DB_CONNECTION_NAME
        });
      });
      it('injects the TYPEGOOSE_MODULE_OPTIONS config', () => {
        expect(DbConnectionToken.inject).toEqual([TYPEGOOSE_MODULE_OPTIONS]);
      });
      it('creates the mongoose connection', () => {
        const optionsFromOptionFactory = {
          uri: 'uriForMongoose',
          other: 'options',
          can: 'work'
        };
        expect(DbConnectionToken.useFactory(optionsFromOptionFactory)).toBe(connection);
        expect(mongoose.createConnection).toHaveBeenCalledWith(optionsFromOptionFactory.uri, {
          other: 'options',
          can: 'work'
        });
      });
    });

    describe('different types', () => {
      describe('useFactory', () => {
        beforeEach(() => {
          module = TypegooseCoreModule.forRootAsync({
            useFactory: mockOptionFactory,
            inject: wantedDependencies
          });
        });
        it('injects the factory\'s async options into DEFAULT_DB_CONNECTION_NAME', () => {
          expect(module.providers).toMatchSnapshot();
          expect(module.exports).toMatchSnapshot();
          const typegooseModuleOptionsFactoryProvider =
            module.providers.find(provider =>
              (provider as FactoryProvider).provide === TYPEGOOSE_MODULE_OPTIONS
            ) as FactoryProvider;
          expect(typegooseModuleOptionsFactoryProvider.inject).toBe(wantedDependencies);
          expect(typegooseModuleOptionsFactoryProvider.useFactory).toBe(mockOptionFactory);
        });
      });

      describe('useClass', () => {
        let mockConfigClass;
        beforeEach(() => {
          mockConfigClass = {
            createTypegooseOptions: jest.fn()
          };

          module = TypegooseCoreModule.forRootAsync({
            useClass: mockConfigClass
          });
        });
        it('provides the TypegooseConfigService class for TYPEGOOSE_MODULE_OPTIONS', () => {
          const classProvider =
            module.providers.find(provider =>
              (provider as ClassProvider).provide === mockConfigClass
            ) as ClassProvider;
          expect(classProvider.provide).toBe(mockConfigClass);
          expect(classProvider.useClass).toBe(mockConfigClass);
        });
        it('creates a factory called TYPEGOOSE_MODULE_OPTIONS that calls TypegooseConfigService\'s createMongooseOptions', async () => {
          const typegooseModuleOptionsFactoryProvider =
            module.providers.find(provider =>
              (provider as FactoryProvider).provide === TYPEGOOSE_MODULE_OPTIONS
            ) as FactoryProvider;
          // The factory needs to get the class
          expect(typegooseModuleOptionsFactoryProvider.inject).toEqual([mockConfigClass]);
          // Then provides wrapper factory, which will get injected TypegooseConfigService
          await typegooseModuleOptionsFactoryProvider.useFactory(mockConfigClass);
          expect(mockConfigClass.createTypegooseOptions).toHaveBeenCalled();
        });
      });

      describe('useExisting', () => {
        let mockUseExistingClass;

        beforeEach(() => {
          mockUseExistingClass = jest.fn();
          module = TypegooseCoreModule.forRootAsync({
            useExisting: mockUseExistingClass
          });
        });

        it('injects the useExisting class into the TYPEGOOSE_MODULE_OPTIONS factory', () => {
          const typegooseModuleOptionsFactoryProvider =
            module.providers.find(provider =>
              (provider as FactoryProvider).provide === TYPEGOOSE_MODULE_OPTIONS
            ) as FactoryProvider;
          expect(typegooseModuleOptionsFactoryProvider.inject).toEqual([mockUseExistingClass]);
        });
      });
    });
  });

  describe('Disconnect in onModuleDestroy', () => {
    it('should close connection while destroying module', async () => {
      const closeMock = jest.fn(() => Promise.resolve());
      const coreModule = new TypegooseCoreModule({
        get: () => ({ close: closeMock }) as any,
      });

      await coreModule.onModuleDestroy();

      expect(closeMock).toHaveBeenCalledTimes(1);
    });

    it('shouldn\'t throw error on destroy when dbConnectionToken not found in ref', async () => {
      const coreModule = new TypegooseCoreModule({
        get: () => null,
      } as any);

      await expect(() => coreModule.onModuleDestroy()).not.toThrow();
    });
  });
});