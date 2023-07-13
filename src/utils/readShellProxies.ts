import { ProxyName, iterateProxyRegexps } from './proxyRegexps';
import { readShellConfig } from './readShellConfig';

export async function readShellProxies(shellName?: string) {
  const shellConfig = await readShellConfig(shellName);
  const proxies = new Map<ProxyName, string>([
    ['http', ''],
    ['https', ''],
    ['ftp', ''],
  ]);

  iterateProxyRegexps((name, regexp) => {
    const values = shellConfig.match(regexp);
    if (values && values[2]) {
      proxies.set(name, values[2]);
    }
  });

  return proxies;
}
