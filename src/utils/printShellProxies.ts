import chalk from 'chalk';
import { EOL } from 'os';
import { readShellProxies, getDefaultProxyValue, getShellName } from '.';

interface Options {
  printHead?: () => void;
  printTail?: () => void;
}

export async function printShellProxies(shellName?: string, options?: Options) {
  const { printHead, printTail } = options ?? {};
  const proxies = await readShellProxies(shellName);
  const defaultProxyValue = await getDefaultProxyValue();

  if (printHead) {
    printHead();
    console.log();
  }

  console.log(
    'Default proxy server:',
    defaultProxyValue ? defaultProxyValue : chalk.dim('(unset)'),
    `${EOL}Current shell: ${getShellName()}`,
    EOL + '--------------',
  );
  proxies.forEach((value, key) => {
    console.log(
      chalk.green(key) + ': ' + (value ? value : chalk.dim('(unset)')),
    );
  });

  if (printTail) {
    console.log();
    printTail();
  }
}
