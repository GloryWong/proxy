import { readFile } from 'fs/promises';
import { getShellConfigPath } from './getShellConfigPath';

export function readShellConfig(shellName?: string) {
  const configPath = getShellConfigPath(shellName);
  return readFile(configPath, 'utf-8');
}
