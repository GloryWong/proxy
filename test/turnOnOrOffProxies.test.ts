import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { actOnShellProxies } from '../src/actOnShellProxies';
import {
  ProxyName,
  readShellConfig,
  createProxyEnvVarRegexp,
  deleteDefaultProxyValue,
  setDefaultProxyValue,
  proxyNames,
} from '../src/utils';
import { DEFAULT_PROXY_VALUE } from './test-data';
import { createBasicEnv } from './createBasicEnv';

const { store, restore } = createBasicEnv();

async function assertProxySet(
  proxyName: ProxyName,
  proxyValue: string,
  negation = false,
) {
  const content = await readShellConfig();
  const regexp = createProxyEnvVarRegexp(proxyName, proxyValue);
  if (negation) {
    expect(content).not.toMatch(regexp);
  } else {
    expect(content).toMatch(regexp);
  }
}

describe('Turn on and off proxies', () => {
  beforeEach(store);

  describe('Without default proxy value', () => {
    beforeEach(() => {
      deleteDefaultProxyValue();
    });

    test('should throw error when no default proxy value is set', async () => {
      return expect(() => actOnShellProxies({ on: '' })).rejects.toThrowError(
        'default proxy',
      );
    });
  });

  describe('With default proxy value', () => {
    beforeEach(() => {
      setDefaultProxyValue(DEFAULT_PROXY_VALUE);
    });

    test('should turn on and off a single proxy', async () => {
      await actOnShellProxies({ on: 'https' });
      await assertProxySet('https', DEFAULT_PROXY_VALUE);

      await actOnShellProxies({ off: 'https' });
      await assertProxySet('https', DEFAULT_PROXY_VALUE, true);
    });

    test('should turn on and off all proxies', async () => {
      await actOnShellProxies({ on: '' });
      for (const proxyName of proxyNames) {
        await assertProxySet(proxyName, DEFAULT_PROXY_VALUE);
      }

      await actOnShellProxies({ off: '' });
      for (const proxyName of proxyNames) {
        await assertProxySet(proxyName, DEFAULT_PROXY_VALUE, true);
      }
    });
  });

  afterEach(restore);
});
