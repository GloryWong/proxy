// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { Options } from 'execa';
import { EOL } from 'os';
import {
  createProxyEnvName,
  getDefaultProxyValue,
  hasDefaultProxyValue,
  proxyNames,
} from './utils';
import chalk from 'chalk';

export async function proxyCmd(command: string, options?: Options) {
  if (!(await hasDefaultProxyValue())) {
    throw new Error(
      'You are trying to use proxy, but no default proxy value is set. See `proxy --help`.',
    );
  }

  const defaultProxyValue = await getDefaultProxyValue();

  console.log(
    `Proxy ${chalk.green(defaultProxyValue)} is used. See \`proxy --help\`.`,
    EOL,
  );

  const proxies: Record<string, string> = {};
  proxyNames.forEach((v) => {
    proxies[createProxyEnvName(v)] = defaultProxyValue;
  });

  const { execaCommand } = await import('execa');
  const { stdout, stderr } = await execaCommand(command, {
    ...options,
    env: {
      ...options?.env,
      ...proxies,
    },
  });
  console.log(stdout);
  stderr && console.error(stderr);
}
