export async function getConfigStore() {
  const Configstore = (await import('configstore')).default;
  return new Configstore('gloxy-proxy');
}
