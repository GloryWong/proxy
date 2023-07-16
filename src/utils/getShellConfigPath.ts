import { getCurrentShellName } from './getCurrentShellName';
import { supportedShells } from '../constants';

export async function getShellConfigPath(shellName?: string) {
  shellName = shellName ?? (await getCurrentShellName());

  const shell = supportedShells.find((v) => v.name === shellName);
  if (!shell) {
    throw new Error(`Shell \`${shellName}\` is unsupported`);
  }

  return shell.configPath;
}
