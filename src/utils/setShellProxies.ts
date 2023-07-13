import { readShellConfig } from './readShellConfig';
import {
  ProxyName,
  createProxyEnvVar,
  iterateProxyRegexps,
} from './proxyRegexps';
import { EOL } from 'os';
import { writeShellConfig } from './writeShellConfig';

type ProxyValue = Partial<Record<ProxyName, string>> | string;

export async function setShellProxies(
  proxyValue: ProxyValue,
  shellName?: string,
) {
  let shellConfig = await readShellConfig(shellName);

  function getProxyValue(proxyName: ProxyName) {
    if (typeof proxyValue === 'string') {
      return proxyValue;
    } else {
      return proxyValue[proxyName];
    }
  }

  iterateProxyRegexps((name, regexp) => {
    const proxyValue = getProxyValue(name);
    if (!proxyValue) return;

    if (regexp.test(shellConfig)) {
      shellConfig = shellConfig.replace(regexp, (_, p1) => p1 + proxyValue);
    } else {
      shellConfig += EOL + createProxyEnvVar(name, proxyValue);
    }
  });

  writeShellConfig(shellConfig);
}
