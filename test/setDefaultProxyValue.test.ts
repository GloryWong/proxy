import { expect, describe, test, beforeEach, afterEach } from 'vitest';
import { actOnShellProxies } from '../src/actOnShellProxies';
import {
  deleteDefaultProxyValue,
  getDefaultProxyValue,
  setDefaultProxyValue,
} from '../src/utils';
import { DEFAULT_PROXY_VALUE, DEFAULT_PROXY_VALUE_1 } from './test-data';
import { createBasicEnv } from './createBasicEnv';

const { store, restore } = createBasicEnv();

describe('Set default proxy value', () => {
  beforeEach(store);

  test('should throw error when no input proxy value is provied', async () => {
    expect(() => actOnShellProxies({ set: '' })).rejects.toThrowError();
  });

  test('should set new default proxy value', async () => {
    deleteDefaultProxyValue();
    await actOnShellProxies({ set: DEFAULT_PROXY_VALUE });
    expect(getDefaultProxyValue()).toBe(DEFAULT_PROXY_VALUE);
  });

  test('should replace old default proxy value', async () => {
    setDefaultProxyValue(DEFAULT_PROXY_VALUE);
    await actOnShellProxies({ set: DEFAULT_PROXY_VALUE_1 });
    expect(getDefaultProxyValue()).toBe(DEFAULT_PROXY_VALUE_1);
  });

  afterEach(restore);
});
