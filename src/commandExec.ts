import { execaCommandSync } from 'execa'
import { proxyServer } from './config.js'

function proxyForCommandExec(command: string) {
  try {
    const { stdout, stderr } = execaCommandSync(command, {
      env: {
        http_proxy: proxyServer,
        https_proxy: proxyServer,
      },
    })
    stdout && console.log(stdout)
    // stderr && console.error(stderr);
  } catch (error) {
    console.error('Proxy for command exec', error)
  }
}

export { proxyForCommandExec }
