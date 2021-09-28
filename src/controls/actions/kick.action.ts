import { Action } from '@src/utils/data.interface'
import { log } from 'wechaty'

const PRE = 'kick'

export const kick: Action = async (g, message, commandObject) => {
  const bot = g.bot
  const room = await bot.Room.find(commandObject.room)
  if (!room) {
    log.info(PRE, `connot find room: ${commandObject.room}`)
    return
  }
  const target = await room.member(commandObject.target)
  if (!target) {
    log.info(PRE, `connot find contact: ${commandObject.target}`)
    return
  }
  log.info(PRE, `trying to remove contact ${target.name()} from room ${await room.topic()}`)
  await room.remove(target)
}