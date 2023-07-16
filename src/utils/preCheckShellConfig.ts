import { access, constants } from 'fs/promises';
import { getShellConfigPath, isUnixLike } from '.';

export async function preCheckShellConfig(shellName?: string) {
  if (!isUnixLike()) {
    throw new Error('Currently only Unix-like platform is supported');
  }

  // check availability of the shell config file
  const configPath = getShellConfigPath(shellName);
  try {
    await access(configPath, constants.F_OK | constants.R_OK | constants.W_OK);
  } catch (error) {
    throw new Error(
      `Shell config file \`${configPath}\` does not exist, or cannot be read or written`,
    );
  }
}
