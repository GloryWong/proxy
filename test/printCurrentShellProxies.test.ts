import {
  SpyInstance,
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest';
import { createBasicEnv } from './createBasicEnv';
import { actOnShellProxies } from '../src/actOnShellProxies';
import chalk from 'chalk';
import { ProxyName, proxyNames, setDefaultProxyValue } from '../src/utils';
import { DEFAULT_PROXY_VALUE } from './test-data';

const { store, restore } = createBasicEnv();

describe('Print present shell proxies', () => {
  let consoleLogSpy: SpyInstance;

  function expectPrintProxy(proxyName: ProxyName, proxyValue: string) {
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringMatching(
        new RegExp(
          `^${proxyName}:\\s*${proxyValue ? proxyValue : '\\(unset\\)'}\\s*$`,
        ),
      ),
    );
  }

  beforeEach(async () => {
    await store();
    consoleLogSpy = vi.spyOn(console, 'log');
    chalk.level = 0; // disable chalk coloring
  });

  afterEach(async () => {
    await restore();
    consoleLogSpy.mockRestore();
  });

  test('No proxy is set', async () => {
    await actOnShellProxies({});
    proxyNames.forEach((proxyName) => {
      expectPrintProxy(proxyName, '');
    });
  });

  test('Partial proxies are set', async () => {
    await setDefaultProxyValue(DEFAULT_PROXY_VALUE);
    await actOnShellProxies({ on: 'http' });

    expectPrintProxy('http', DEFAULT_PROXY_VALUE);

    proxyNames
      .filter((v) => v !== 'http')
      .forEach((proxyName) => {
        expectPrintProxy(proxyName, '');
      });
  });
});
