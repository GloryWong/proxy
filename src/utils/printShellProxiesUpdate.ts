import chalk from 'chalk';
import { getShellConfigPath, printShellProxies } from '.';

export function printShellProxiesUpdate(changed: boolean, shellName?: string) {
  return printShellProxies(shellName, {
    printTail: () => {
      if (changed) {
        console.log(
          'Please run the following command to make the updates take effect in this session:',
        );
        console.log(chalk.yellow(`source ${getShellConfigPath()}`));
      } else {
        console.log('Nothing changed.');
      }
    },
  });
}
