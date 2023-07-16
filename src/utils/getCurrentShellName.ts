import { basename } from 'path';

export async function getCurrentShellName() {
  let shell = process.env.SHELL;
  if (!shell) {
    const { execa } = await import('execa');
    const { stdout } = await execa('echo', ['$0'], { shell: true });
    shell = stdout.trim();
  }

  if (!shell) throw new Error('Shell cannot be determined');

  return basename(shell);
}
