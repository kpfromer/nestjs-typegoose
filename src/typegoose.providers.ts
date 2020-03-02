import { FactoryProvider } from '@nestjs/common/interfaces';
import { getDiscriminatorModelForClass, getModelForClass } from '@typegoose/typegoose';
import { isClass } from 'is-class';
import { Connection } from 'mongoose';
import { TypegooseClass, TypegooseClassWithOptions, TypegooseDiscriminator } from './typegoose-class.interface';
import { getConnectionToken, getModelToken } from './typegoose.utils';

type ModelFactory = (c: Connection) => any;

/**
 * Creates the nestjs providers for the provided models.
 * @param connectionName the name of the mongoose connection
 * @param models the models to create the nestjs providers
 * @returns the model providers.
 */
export function createTypegooseProviders(connectionName: string,
                                         models: TypegooseClassWithOptions[] = []): FactoryProvider[] {

  const connectionToken = getConnectionToken(connectionName);

  const buildProvider = ({ name }: TypegooseClass, modelFactory: ModelFactory) => ({
    provide: getModelToken(name),
    useFactory: modelFactory,
    inject: [connectionToken],
  });

  const createDiscriminatorFactoryFrom = (parentFactory: ModelFactory) =>
    (discriminatorDefinition: TypegooseClass | TypegooseDiscriminator) => {
      if (isTypegooseClass(discriminatorDefinition)) {
        return buildProvider(discriminatorDefinition, (connection: Connection) =>
          getDiscriminatorModelForClass(
            parentFactory(connection),
            discriminatorDefinition
          )
        );
      }
      const { typegooseClass, discriminatorId } = discriminatorDefinition;
      return buildProvider(typegooseClass, (connection: Connection) =>
        getDiscriminatorModelForClass(
          parentFactory(connection),
          typegooseClass,
          discriminatorId
        )
      );
    };

  return models.reduce(
    (providers, { typegooseClass, schemaOptions = {}, discriminators = [] }) => {

      const modelFactory = (connection: Connection) => getModelForClass(
        typegooseClass,
        { existingConnection: connection, schemaOptions },
      );

      const modelProvider = buildProvider(typegooseClass, modelFactory);

      const discriminatorProviders = discriminators.map(createDiscriminatorFactoryFrom(modelFactory));

      return [...providers, modelProvider, ...discriminatorProviders];
    },
    [],
  );
}

type ClassOrDiscriminator = TypegooseClassWithOptions | TypegooseDiscriminator;
type TypegooseInput = TypegooseClass | ClassOrDiscriminator;

/**
 * Santizes the input to a common object form used for creating providers.
 * @param item varied general input to convert
 * @returns a santized generic form
 * @internal
 */
export function convertToTypegooseClassWithOptions(item: TypegooseInput): TypegooseClassWithOptions {
  const tcwo: TypegooseClassWithOptions = convertToOptions(item);
  if (tcwo) {

    if (tcwo.discriminators) {
      tcwo.discriminators = tcwo.discriminators.map(d => convertToOptions(d) || invalidObject('discriminator'));
    }

    return tcwo;
  }

  return invalidObject('model');
}

/**
 * Returns whether or not something is a class.
 * @param item the value to check whether or not it is a class
 * @internal
 */
const isTypegooseClass = (item): item is TypegooseClass => isClass(item);

/**
 * Returns whether or not a value is a typegoose class with options.
 * @param item the value to check whether or not it is a typegoose class with options
 * @internal
 */
const isTypegooseClassWithOptions = (item): item is TypegooseClassWithOptions => isTypegooseClass(item.typegooseClass);

/**
 * Converts a model class to valid typegoose class structure.
 * @param item the item to convert
 * @returns the valid typegoose class
 * @internal
 */
function convertToOptions(item: TypegooseInput): ClassOrDiscriminator | undefined {
  if (isTypegooseClass(item)) {
    return { typegooseClass: item };
  } else if (isTypegooseClassWithOptions(item)) {
    return item;
  }
}

/**
 * Throws error representing an invalid provided value.
 * @param type the invalid type
 */
function invalidObject(type: string): never {
  throw new Error(`Invalid ${type} object`);
}
