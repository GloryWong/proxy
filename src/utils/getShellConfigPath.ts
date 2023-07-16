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
    case 'sh':
    case 'dash':
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
    default:
      throw `Unknown shell configuration path (${shellName})`;
  }
}
