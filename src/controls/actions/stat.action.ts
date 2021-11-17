import { Action } from '@src/utils/data.interface'
import { log } from 'wechaty'

const PRE = 'stat'

export const stat: Action = async (g, message, commandObject) => {

  const statStr = g.stat.toOutputString()

  log.info(PRE, `reporting bot stat: ${statStr.replace(/\n/g, ';')}`)
  await g.commander.say(statStr)
}