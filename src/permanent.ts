import { execaCommandSync } from 'execa'
import { proxyServer } from './config.js'
import { readFileSync, writeFileSync } from 'fs'

type Options = {
  set: boolean
  unset: boolean
  get: boolean
}
const proxySetting = `export http_proxy=${proxyServer}`
const ZSHRC_PATH = `${process.env.HOME}/.zshrc`
const regx = /^export (http_proxy=.*)$/m
const wholeText = `

# Proxy setting by \`Proxy-Wrapper\`
${proxySetting}`
const wholeRegx = new RegExp(wholeText, 'm')
const readShellRc = () => readFileSync(ZSHRC_PATH, 'utf8')
const writeFileRc = (content: string) => {
  writeFileSync(ZSHRC_PATH, content, 'utf8')
  sourceShellRc()
}
const sourceShellRc = () =>
  execaCommandSync(`source ${ZSHRC_PATH}`, { shell: true })

export function proxyForPermanent(options: Options) {
  try {
    if (options.set) {
      let content = readShellRc()
      if (regx.test(content)) {
        content = content.replace(regx, proxySetting)
      } else {
        content = `${content}${wholeText}`
      }
      writeFileRc(content)
    } else if (options.unset) {
      const content = readShellRc()
      if (wholeRegx.test(content)) {
        writeFileRc(content.replace(new RegExp(wholeText, 'gm'), ''))
      } else {
        writeFileRc(content.replace(regx, ''))
      }
    } else {
      const content = readShellRc()
      const matches = content.match(regx)
      console.log(matches?.[1] || 'Not set')
    }
  } catch (error) {
    console.error('Proxy for permanent', error)
  }
}
