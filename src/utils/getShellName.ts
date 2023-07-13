import { basename } from 'path';
import { isWinOS } from './isWinOS';

export function getShellName() {
  const shell = isWinOS() ? process.env.ComSpec : process.env.SHELL;
  if (!shell) throw 'Cannot get shell by environment variable';

  return basename(shell);
}
