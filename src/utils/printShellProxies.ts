import chalk from 'chalk';
import { EOL } from 'os';
import { readShellProxies, getDefaultProxyValue, getCurrentShellName } from '.';

interface Options {
  printHead?: () => void | Promise<void>;
  printTail?: () => void | Promise<void>;
}

export async function printShellProxies(shellName?: string, options?: Options) {
  const { printHead, printTail } = options ?? {};
  const proxies = await readShellProxies(shellName);
  const defaultProxyValue = await getDefaultProxyValue();

  if (printHead) {
    await printHead();
    console.log();
  }

  console.log(
    'Default proxy server:',
    defaultProxyValue ? defaultProxyValue : chalk.dim('(unset)'),
    `${EOL}Current shell: ${await getCurrentShellName()}`,
    EOL + '--------------',
  );
  proxies.forEach((value, key) => {
    console.log(
      chalk.green(key) + ': ' + (value ? value : chalk.dim('(unset)')),
    );
  });

  if (printTail) {
    console.log();
    await printTail();
  }
}
