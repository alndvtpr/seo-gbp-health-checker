import * as migration_20260905_050909_init from './20260905_050909_init';

export const migrations = [
  {
    up: migration_20260905_050909_init.up,
    down: migration_20260905_050909_init.down,
    name: '20260905_050909_init'
  },
];
