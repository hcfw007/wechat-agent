import { Action } from '@src/utils/data.interface'
import { log } from 'wechaty'

const PRE = 'stat'

export const stat: Action = async (g, message, commandObject) => {

  const command = commandObject.type
  let statStr: string
  if (command !== 'overall') {
    statStr = g.stat.toOutputString()
  } else {
    statStr = g.stat.toOverallOutputString()
  }

  log.info(PRE, `reporting bot stat: ${statStr.replace(/\n/g, ';')}`)
  await g.commander.say(statStr)
}