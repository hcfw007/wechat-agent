import { Action } from '@src/utils/data.interface'
import { log } from 'wechaty'

const PRE = 'list'

export const list: Action = async (g, message) => {
  const bot = g.bot
  log.info(PRE, `trying to get contact and room list`)

  await g.commander.say('trying to get contact and room list, this may take a while...')
  const contacts = await bot.Contact.findAll()
  const contactPromises = []
  for (const contact of contacts) {
    contactPromises.push(contact.name())
  }
  const contactNames = await Promise.all(contactPromises)

  const rooms = await bot.Room.findAll()
  const roomPromises = []
  for (const room of rooms) {
    roomPromises.push(room.topic())
  }
  const roomNames = await Promise.all(roomPromises)

  await g.commander.say('contact list:')
  await g.commander.say(`${ contactNames.join(', ') }.`)
  await g.commander.say('room list:')
  await g.commander.say(`${roomNames.join(', ')}.`)
}