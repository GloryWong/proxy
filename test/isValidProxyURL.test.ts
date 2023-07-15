import { describe, expect, test } from 'vitest';
import { isValidProxyURL } from '../src/utils';

const invalidProxyURLs = [
  'well://proxy.com',
  '://proxy.com',
  '/proxy.com',
  'proxy.com:',
  'username:proxy.com',
  'username:password',
  'username:password:123',
];

const validProxyURLs = [
  'proxy',
  'https://proxy',
  'proxy.com',
  'socks5://proxy.com',
  'proxy:123',
  'proxy:123/',
  'proxy/',
  'http://username:password@proxy.com:123',
];

describe('#isValidProxyURL', () => {
  test('Invalid', () => {
    invalidProxyURLs.forEach((v) => {
      expect(
        isValidProxyURL(v),
        `expect ${v} to be an invalid proxy url`,
      ).not.toBeTruthy();
    });
  });

  test('Valid', () => {
    validProxyURLs.forEach((v) => {
      expect(
        isValidProxyURL(v),
        `expect ${v} to be a valid proxy url`,
      ).toBeTruthy();
    });
  });
});
