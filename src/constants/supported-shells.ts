import { homedir } from 'os';
import { join } from 'path';
import { TupleToUnion, ValueOf } from 'type-fest';

const _homedir = homedir();

function normalizeConfigPath(configPath: string) {
  return join(_homedir, configPath);
}

export const supportedShells = [
  {
    name: 'sh',
    configPath: normalizeConfigPath('.bashrc'),
  },
  {
    name: 'dash',
    configPath: normalizeConfigPath('.bashrc'),
  },
  {
    name: 'bash',
    configPath: normalizeConfigPath('.bashrc'),
  },
  {
    name: 'zsh',
    configPath: normalizeConfigPath('.zshrc'),
  },
  {
    name: 'fish',
    configPath: normalizeConfigPath('.config/fish/config.fish'),
  },
  {
    name: 'csh',
    configPath: normalizeConfigPath('.cshrc'),
  },
  {
    name: 'tcsh',
    configPath: normalizeConfigPath('.cshrc'),
  },
  {
    name: 'ksh',
    configPath: normalizeConfigPath('.kshrc'),
  },
  {
    name: 'mksh',
    configPath: normalizeConfigPath('.kshrc'),
  },
] as const;

export type ShellName = ValueOf<TupleToUnion<typeof supportedShells>, 'name'>;
