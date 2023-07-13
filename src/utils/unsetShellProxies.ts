import { ProxyNames, iterateProxyRegexps } from './proxyRegexps';
import { readShellConfig } from './readShellConfig';
import { writeShellConfig } from './writeShellConfig';

export async function unsetShellProxies(
  proxyNames: ProxyNames,
  shellName?: string,
) {
  let shellConfig = await readShellConfig(shellName);

  iterateProxyRegexps((name, regexp) => {
    if (!proxyNames.includes(name)) return;
    shellConfig = shellConfig.replace(regexp, '');
  });

  writeShellConfig(shellConfig);
}
