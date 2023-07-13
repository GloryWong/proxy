import minimist from 'minimist';
import { proxyCmd } from './proxyCmd.js';
import { showVersion } from './version.js';
import showHelp from './help.js';
import { actOnShellProxies } from './actOnShellProxies.js';

const argv = minimist(process.argv.slice(2), {
  '--': true,
  boolean: ['help', 'version'],
  string: ['on', 'off', 'set', 'unset'],
  alias: {
    h: 'help',
    v: 'version',
  },
});

async function run() {
  const { _, version, help, on, off, set } = argv;
  const command = argv['--']?.join(' ');

  try {
    if (command) {
      await proxyCmd(command);
    } else if (version) {
      await showVersion();
    } else if (help) {
      await showHelp();
    } else {
      await actOnShellProxies({ on, off, set });
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

run();
