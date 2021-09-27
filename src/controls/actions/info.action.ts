import { Global } from '@src/utils/data.interface'
import { log, Message } from 'wechaty'

const PRE = 'info'

export const info = async (g: Global, message: Message, commandObject: any) => {
  const infoStr = `当前微信名：${g.bot.userSelf().name()}\n操作微信名：${g.commander.name()}\n转发微信名：${g.target? g.target.name() : '无'}`
  log.info(PRE, `reporting bot info: ${ infoStr.replace(/\n/g, ';') }`)
  g.commander.say(infoStr)
} 