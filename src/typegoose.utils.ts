import { DEFAULT_DB_CONNECTION_NAME } from './typegoose.constants';

/**
 * Returns the provider token name.
 * @param model The model name
 * @returns The token name
 * @internal
 */
export function getModelToken(model: string) {
  return `${model}Model`;
}

/**
 * Returns the provider connection token name.
 * @param name the name of the connection
 * @returns the connection provider name
 * @internal
 */
export function getConnectionToken(name?: string) {
  if (typeof name === 'string' && name !== DEFAULT_DB_CONNECTION_NAME) {
    return `${name}Connection`;
  }
  return DEFAULT_DB_CONNECTION_NAME;
}
