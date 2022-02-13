import { readPackageUpSync } from 'read-pkg-up'

export function getVersion() {
  const readResult = readPackageUpSync({ normalize: false })
  return readResult?.packageJson?.version
}

export function showVersion() {
  const version = getVersion()
  version && console.log(version)
}
