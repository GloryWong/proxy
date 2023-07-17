import { describe, expect, test } from 'vitest';
import {} from '../src';
import { getVersion } from '../src/version';

describe('#getVersion', () => {
  test('should return version', async () => {
    expect(await getVersion()).not.toBeUndefined();
  });
});
