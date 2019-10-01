import { DEFAULT_DB_CONNECTION_NAME } from "./typegoose.constants";

export function getModelToken(model: string) {
  return `${model}Model`;
}

export function getConnectionToken(name?: string) {
  if (typeof name === 'string' && name !== DEFAULT_DB_CONNECTION_NAME) {
    return `${name}Connection`;
  }
  return DEFAULT_DB_CONNECTION_NAME;
}
