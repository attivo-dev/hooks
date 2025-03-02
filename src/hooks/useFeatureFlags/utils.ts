import { STORAGE_KEY } from './constants.js';

export const checkStorage = (storage: Storage, key: string) => {
  const flags = storage.getItem(STORAGE_KEY);
  if (flags) {
    const parsed = JSON.parse(flags);
    if (parsed[key] !== undefined) {
      return parsed[key];
    }
  }
  return null;
};
