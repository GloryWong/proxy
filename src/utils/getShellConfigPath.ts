import { join } from 'path';
import { isWinOS } from './isWinOS';
import { homedir } from 'os';
import { getShellName } from './getShellName';

function getPath(configFileName: string) {
  return join(homedir(), configFileName);
}

export function getShellConfigPath(shellName?: string) {
  shellName = shellName ?? getShellName();

  if (isWinOS()) {
    throw 'Windows shell configurations are stored in the registry.';
  }

  switch (shellName) {
    case 'bash':
      return getPath('.bashrc');
    case 'zsh':
      return getPath('.zshrc');
    case 'fish':
      return getPath('.config/fish/config.fish');
    case 'csh':
    case 'tcsh':
      return getPath('.cshrc');
    case 'ksh':
    case 'mksh':
      return getPath('.kshrc');
    case 'sh':
    case 'dash':
      throw 'sh and dash do not have a specific configuration file';
    default:
      throw `Unknown shell configuration path (${shellName})`;
  }
}
