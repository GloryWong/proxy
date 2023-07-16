import chalk from 'chalk';
import {
  ProxyName,
  getDefaultProxyValue,
  hasDefaultProxyValue,
  isValidProxyURL,
  printShellProxies,
  proxyNames,
  setDefaultProxyValue,
  setShellProxies,
  unsetShellProxies,
} from './utils';

async function turnOn(proxyName: ProxyName | '', shellName?: string) {
  if (!(await hasDefaultProxyValue()))
    throw new Error('Please set the default proxy value first.');

  const proxyValue: string = await getDefaultProxyValue();

  if (proxyName === '') {
    await setShellProxies(proxyValue, shellName);
  } else {
    await setShellProxies(
      {
        [proxyName]: proxyValue,
      },
      shellName,
    );
  }
}

async function turnOff(proxyName: ProxyName | '', shellName?: string) {
  if (proxyName === '') {
    await unsetShellProxies(proxyNames, shellName);
  } else {
    await unsetShellProxies([proxyName], shellName);
  }
}

async function setDefault(proxyValue: string) {
  if (proxyValue === '') throw 'Please provide proxy value to be set.';

  if (!isValidProxyURL(proxyValue))
    throw `${proxyValue} is an invalid proxy url`;

  const oldDefaultProxyValue = await getDefaultProxyValue();
  if (proxyValue === oldDefaultProxyValue) {
    console.log(
      'Nothing changed: identical to the existing proxy default value.',
    );
    return;
  }

  await setDefaultProxyValue(proxyValue);

  await printShellProxies(undefined, {
    printHead: () => {
      console.log(
        'Proxy default value changed',
        chalk.yellow(oldDefaultProxyValue),
        '->',
        chalk.yellow(proxyValue),
      );
    },
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
    return turnOn(on);
  } else if (off !== undefined) {
    return turnOff(off);
  } else if (set !== undefined) {
    return setDefault(set.trim());
  }

  await printShellProxies();
}
