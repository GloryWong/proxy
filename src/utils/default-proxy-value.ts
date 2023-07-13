import { getConfigStore } from './getConfigStore';

const KEY = 'default-proxy';

export async function setDefaultProxyValue(proxyValue: string) {
  const configStore = await getConfigStore();
  configStore.set(KEY, proxyValue);
}

export async function getDefaultProxyValue() {
  const configStore = await getConfigStore();
  return configStore.get(KEY);
}

export async function hasDefaultProxyValue() {
  const configStore = await getConfigStore();
  return configStore.has(KEY);
}

export async function deleteDefaultProxyValue() {
  const configStore = await getConfigStore();
  configStore.delete(KEY);
}
