import chalk from 'chalk';
import {
  ProxyName,
  getDefaultProxyValue,
  getShellName,
  hasDefaultProxyValue,
  isValidProxyURL,
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
    const _set = set.trim();
    if (_set === '') throw 'Please provide proxy value to be set.';
    if (!isValidProxyURL(_set)) throw `${_set} is an invalid proxy url`;
    await setDefaultProxyValue(_set);
  }

  await printProxies();
}
