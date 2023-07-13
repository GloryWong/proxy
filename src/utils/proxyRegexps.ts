import { TupleToUnion } from 'type-fest';

export const proxyNames = ['http', 'https', 'ftp'] as const;
export type ProxyName = TupleToUnion<typeof proxyNames>;
export type ProxyNames = Readonly<ProxyName[]>;

export const proxyRegexps: Readonly<Record<ProxyName, RegExp>> = {
  http: /^\s*(export\s+HTTP_PROXY\s*=\s*)([^\s]+)\s*$/m,
  https: /^\s*(export\s+HTTPS_PROXY\s*=\s*)([^\s]+)\s*$/m,
  ftp: /^\s*(export\s+FTP_PROXY\s*=\s*)([^\s]+)\s*$/m,
};

export function createProxyEnvName(proxyName: ProxyName) {
  return `${proxyName.toUpperCase()}_PROXY`;
}

export function createProxyEnvVar(proxyName: ProxyName, value: string) {
  return `export ${createProxyEnvName(proxyName)}=${value}`;
}

export function createProxyEnvVarRegexp(proxyName: ProxyName, value: string) {
  return new RegExp(
    `^\\s*export\\s+${createProxyEnvName(proxyName)}\\s*=\\s*${value}\\s*$`,
    'm',
  );
}

export function iterateProxyRegexps(
  callback: (proxyName: ProxyName, proxyValue: RegExp) => void,
) {
  Object.entries(proxyRegexps).forEach(([name, value]) =>
    callback(name as ProxyName, value),
  );
}
