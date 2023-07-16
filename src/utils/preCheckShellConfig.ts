import { access, constants } from 'fs/promises';
import { getShellConfigPath } from '.';

export async function preCheckShellConfig(shellName?: string) {
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
