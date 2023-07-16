import { getVersion } from './version.js';

export default async function () {
  console.log(
    `  Gloxy Proxy (v${await getVersion()})

  Description:
    Set up temporary proxy for one-off command runs or a permanent proxy for your shell.

  Note: Windows platform is currently unsupported.

  Usage:
    proxy [options]

  Options:
    --set <proxy server address>            Set the default proxy value
    --on  [protocal]                        Turn on permanent shell proxy with the default proxy value
    --off [protocal]                        Turn off permanent shell proxy
    -- <command>                            Execute a command with the default proxy value
    -h, --help                              Show this help
    -v, --version                           Show version

  Examples:
    proxy --set http://localhost:51837      Set the default proxy value

    proxy --on                              Turn on permanent shell proxy
    proxy --on ftp                          Turn on permanent shell proxy for specific protocals

    proxy -- curl https://www.google.com    Run a command temporarily with default proxy value
  `,
  );
}
