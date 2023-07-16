import { basename } from 'path';

export function getCurrentShellName() {
  const shell = process.env.SHELL;
  if (!shell) throw 'Cannot find current shell from `process.env.SHELL`';

  return basename(shell);
}
