import { Global } from '@src/utils/data.interface'
import { log, Message } from 'wechaty'
import { processCommand } from './commander'

const PRE = 'messages'

export const handleMessage = async (g: Global, message: Message) => {
  // forward normal messages to the target
  const target = g.target
  const talker = message.talker()
  const room = message.room()
  
  log.info(PRE, `received ${Message.Type[message.type()]} from talker: ${talker?.name()}, id: ${talker?.id} and room: ${await room?.topic()}, id: ${ room?.id }, message id: ${ message.id }`)
  if (!g.ready) {
    log.info(PRE, `message ${ message.id } discarded as the bot is not ready yet`)
    return
  }
  if (!talker.self()) { // somehow talker === bot.userSelf() does not work for this puppet
    if (talker.id == g.commander.id && !room) { // this can be decided with direct object comparison, but to unify all contact deciding process, I use id here too
      await processCommand(g, message)
      return
    }
    g.stat.messageReceived ++
    if (room && !g.roomNameList.includes(await room.topic())) {
      log.info(PRE, `message ${message.id} discarded as it's from a room not in allowed list`)
      return
    }
    log.info(PRE, `forward message ${ message.id } to ${ target.name() }`)
    g.stat.messageForwarded ++
    await target.say(`${ talker.name() } ${ room ? 'in room ' + await room.topic() : '' } said:`)
    // await message.forward(target)
    await target.say(message.text())
  }
}