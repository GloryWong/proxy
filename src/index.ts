import minimist from 'minimist'
import { proxyForCommandExec } from './commandExec.js'
import { proxyForPermanent } from './permanent.js'
import { showVersion } from './version.js'
import showHelp from './help.js'

const argv = minimist(process.argv.slice(2), {
  '--': true,
  boolean: ['help', 'version', 'permanent', 'unset', 'set', 'get'],
  alias: {
    h: 'help',
    v: 'version',
    p: 'permanent',
  },
})

const { _, version, permanent, unset, set, get } = argv
const command = argv['--']?.join(' ')

if (command) {
  proxyForCommandExec(command)
} else if (permanent) {
  proxyForPermanent({
    set,
    unset,
    get,
  })
} else if (version) {
  showVersion()
} else {
  showHelp()
}
