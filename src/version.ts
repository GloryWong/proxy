export async function getVersion() {
  const { readPackageUp } = await import('read-pkg-up');
  const readResult = await readPackageUp({ normalize: false });
  return readResult?.packageJson?.version;
}

export async function showVersion() {
  const version = await getVersion();
  version && console.log(version);
}
