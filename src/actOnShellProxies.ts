import chalk from 'chalk';
import {
  ProxyName,
  getDefaultProxyValue,
  getShellName,
  hasDefaultProxyValue,
  proxyNames,
  readShellProxies,
  setDefaultProxyValue,
  setShellProxies,
  unsetShellProxies,
} from './utils';
import { EOL } from 'os';

async function turnOn(proxyName: ProxyName | '', shellName?: string) {
  if (!(await hasDefaultProxyValue()))
    throw new Error('Please set the default proxy value first.');

  const proxyValue: string = await getDefaultProxyValue();

  if (proxyName === '') {
    return setShellProxies(proxyValue, shellName);
  } else {
    return setShellProxies(
      {
        [proxyName]: proxyValue,
      },
      shellName,
    );
  }
}

function turnOff(proxyName: ProxyName | '', shellName?: string) {
  if (proxyName === '') {
    return unsetShellProxies(proxyNames, shellName);
  } else {
    return unsetShellProxies([proxyName], shellName);
  }
}

async function printProxies(shellName?: string) {
  const proxies = await readShellProxies(shellName);
  const defaultProxyValue = await getDefaultProxyValue();

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
}

export async function actOnShellProxies({
  on,
  off,
  set,
}: {
  on?: ProxyName | '';
  off?: ProxyName | '';
  set?: string;
}) {
  if (on !== undefined) {
    await turnOn(on);
  } else if (off !== undefined) {
    await turnOff(off);
  } else if (set !== undefined) {
    if (set.trim() === '') throw 'Please provide proxy value to be set.';
    await setDefaultProxyValue(set);
  }

  await printProxies();
}
