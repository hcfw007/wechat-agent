import { Global } from "@src/utils/data.interface"
import { log, Message } from "wechaty"
import { parsePayload } from '@src/utils/helpers'

const PRE = 'commander'
const commandList = [
  'kick'
]

export const processCommand = async(g: Global, message: Message) => {
  const bot = g.bot
  const commandStr = message.text()
  const pairList = commandStr.split(' ')
  const command = pairList.shift()
  let commandObject: any = {}
  console.log(commandStr, command)
  if (commandList.includes(command)) {
    commandObject = {
      command,
      ...parsePayload(pairList)
    }
  } else {
    return
  }
  log.info(PRE, `command parsed: ${ JSON.stringify( commandObject ) }`)
  if (command === 'kick') {
    const room = await bot.Room.find(commandObject.room)
    if (!room) {
      log.info(PRE, `connot find room: ${ commandObject.room }`)
      return
    }
    const target = await room.member(commandObject.target)
    if (!target) {
      log.info(PRE, `connot find contact: ${commandObject.target}`)
      return
    }
    log.info(PRE, `trying to remove contact ${ target.name() } from room ${ await room.topic() }`)
    await room.remove(target)
  }
}
