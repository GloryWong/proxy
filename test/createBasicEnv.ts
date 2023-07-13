import { SpyInstance, vi } from 'vitest';

export function createBasicEnv() {
  // Mocked methods and values
  let inMemoryShellConfig = '';
  let inMemoryDefaultProxyValue: string | undefined = undefined;
  const spies = new Set<SpyInstance>();

  async function store() {
    inMemoryShellConfig = 'shellconfigmock=test';

    spies
      .add(
        vi
          .spyOn(
            await import('../src/utils/readShellConfig'),
            'readShellConfig',
          )
          .mockImplementation(
            async (shellName?: string) => inMemoryShellConfig,
          ),
      )
      .add(
        vi
          .spyOn(
            await import('../src/utils/writeShellConfig'),
            'writeShellConfig',
          )
          .mockImplementation(
            async (shellConfig: string, shellName?: string) => {
              inMemoryShellConfig = shellConfig;
            },
          ),
      )
      .add(
        vi
          .spyOn(
            await import('../src/utils/default-proxy-value'),
            'setDefaultProxyValue',
          )
          .mockImplementation(async (proxyValue: string) => {
            inMemoryDefaultProxyValue = proxyValue;
          }),
      )
      .add(
        vi
          .spyOn(
            await import('../src/utils/default-proxy-value'),
            'getDefaultProxyValue',
          )
          .mockImplementation(async () => inMemoryDefaultProxyValue),
      )
      .add(
        vi
          .spyOn(
            await import('../src/utils/default-proxy-value'),
            'hasDefaultProxyValue',
          )
          .mockImplementation(async () => !!inMemoryDefaultProxyValue),
      )
      .add(
        vi
          .spyOn(
            await import('../src/utils/default-proxy-value'),
            'deleteDefaultProxyValue',
          )
          .mockImplementation(async () => {
            inMemoryDefaultProxyValue = undefined;
          }),
      );
  }

  async function restore() {
    inMemoryShellConfig = '';
    inMemoryDefaultProxyValue = undefined;
    spies.forEach((spy) => spy.mockRestore());
    spies.clear();
  }

  return {
    store,
    restore,
  };
}
