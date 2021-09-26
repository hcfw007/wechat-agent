import { Global } from "@src/utils/data.interface"
import { log, Message } from "wechaty"
import { processCommand } from './commander'

const PRE = 'messages'

export const handleMessage = async (g: Global, message: Message) => {
  // forward normal messages to the target
  const target = g.target
  const talker = message.talker()
  const room = message.room()
  log.info(PRE, `received ${ Message.Type[message.type()] } from talker: ${ talker?.name() } or room: ${ await room?.topic() }, message id: ${ message.id }`)
  if (!g.ready) {
    log.info(PRE, `message ${ message.id } discarded as the bot is not ready yet`)
  }
  log.verbose(PRE, `message id: ${ message.id }, talker id: ${ talker?.id }, room id: ${ room?.id }`)
  if (talker.name() !== g.bot.userSelf().name() && !room) {
    log.info(PRE, `forward message ${ message.id } to ${ target.name() }`)
    await target.say(`${ talker.name() } said:`)
    // await message.forward(target)
    await target.say(message.text())
  }
  if (talker == g.commander && !room) {
    processCommand(g, message)
  }
}