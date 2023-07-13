import { writeFile } from 'fs/promises';
import { getShellConfigPath } from './getShellConfigPath';

export async function writeShellConfig(
  shellConfig: string,
  shellName?: string,
) {
  const configPath = getShellConfigPath(shellName);
  return writeFile(configPath, shellConfig, 'utf-8');
}
