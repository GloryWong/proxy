import { printShellProxiesUpdate } from '.';
import { ProxyNames, iterateProxyRegexps } from './proxyRegexps';
import { readShellConfig } from './readShellConfig';
import { writeShellConfig } from './writeShellConfig';

export async function unsetShellProxies(
  proxyNames: ProxyNames,
  shellName?: string,
) {
  let shellConfig = await readShellConfig(shellName);
  let changed = false;

  iterateProxyRegexps((name, regexp) => {
    if (!proxyNames.includes(name)) return;

    if (regexp.test(shellConfig)) {
      shellConfig = shellConfig.replace(regexp, '');
      changed = true;
    }
  });

  await writeShellConfig(shellConfig);

  await printShellProxiesUpdate(changed);
}
