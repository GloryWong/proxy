import os from 'os';

const platform = os.platform();

export function isUnixLike() {
  return (
    platform === 'darwin' ||
    platform === 'freebsd' ||
    platform === 'linux' ||
    platform === 'openbsd' ||
    platform === 'sunos'
  );
}
