import { CommandObject, Global } from '@src/utils/data.interface'
import { log, Message } from 'wechaty'
import { parsePayload } from '@src/utils/helpers'
import { actions } from './actions'

const PRE = 'commander'

export const processCommand = async(g: Global, message: Message) => {
  const commandStr = message.text()
  const pairList = commandStr.split('/(?<!\\) /g')
  const command = pairList.shift()
  let commandObject: CommandObject
  if (command in actions) {
    commandObject = {
      command,
      ...parsePayload(pairList)
    }
    log.info(PRE, `command parsed: ${JSON.stringify(commandObject)}`)
    actions[command](g, message, commandObject)
  }
}
