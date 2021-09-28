import { CommandObject, Global } from '@src/utils/data.interface'
import { log, Message } from 'wechaty'
import { parsePayload } from '@src/utils/helpers'
import { actions } from './actions'

const PRE = 'commander'

export const processCommand = async(g: Global, message: Message) => {
  const commandStr = message.text()
  const pairList = commandStr.split(' ')
  const command = pairList.shift()
  let commandObject: CommandObject
  if (command in actions) {
    actions[command](g, message, commandObject)
    commandObject = {
      command,
      ...parsePayload(pairList)
    }
    log.info(PRE, `command parsed: ${JSON.stringify(commandObject)}`)
  }
}
