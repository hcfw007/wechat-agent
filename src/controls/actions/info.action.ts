import { Global } from '@src/utils/data.interface'
import { log, Message } from 'wechaty'

const PRE = 'info'

export const info = async (g: Global, message: Message, commandObject: any) => {
  const infoStr = `
当前微信名：${g.bot.userSelf().name()}
操作微信名：${g.commander.name()}
转发微信名：${g.target? g.target.name() : '无'}
群白名单: ${ g.roomNameList.length > 0 ? g.roomNameList.join(', ') : '无' }
`
  log.info(PRE, `reporting bot info: ${ infoStr.replace(/\n/g, ';') }`)
  g.commander.say(infoStr)
} 