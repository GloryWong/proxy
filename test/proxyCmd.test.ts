import {
  SpyInstance,
  beforeEach,
  afterEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest';
import { proxyCmd } from '../src/proxyCmd';
import {
  createProxyEnvName,
  proxyNames,
  setDefaultProxyValue,
} from '../src/utils';
import { createBasicEnv } from './createBasicEnv';
import { DEFAULT_PROXY_VALUE } from './test-data';
import chalk from 'chalk';

const { store, restore } = createBasicEnv();

describe('Proxy command', () => {
  let logSpy: SpyInstance;

  beforeEach(async () => {
    await store();
    logSpy = vi.spyOn(console, 'log');
    chalk.level = 0;
  });

  afterEach(async () => {
    await restore();
    logSpy.mockRestore();
  });

  test('should throw error when no default proxy value is set', () => {
    return expect(() =>
      proxyCmd('node cmd-env-var-mock.js', { cwd: __dirname }),
    ).rejects.toThrowError('no default proxy value');
  });

  test('should proxies be accessed in command', async () => {
    setDefaultProxyValue(DEFAULT_PROXY_VALUE);
    const proxyEnvNames = proxyNames.map((v) => createProxyEnvName(v));
    await proxyCmd(
      `node cmd-env-var-mock.js proxies-for-cmd ${proxyEnvNames.join(' ')}`,
      {
        cwd: __dirname,
      },
    );

    expect(logSpy).toHaveBeenCalledWith(
      [
        'proxies-for-cmd',
        DEFAULT_PROXY_VALUE,
        DEFAULT_PROXY_VALUE,
        DEFAULT_PROXY_VALUE,
      ].join(' '),
    );
  });
});
