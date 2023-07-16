import { readFile } from 'fs/promises';
import { getShellConfigPath } from './getShellConfigPath';

export async function readShellConfig(shellName?: string) {
  const configPath = await getShellConfigPath(shellName);
  return readFile(configPath, 'utf-8');
}
