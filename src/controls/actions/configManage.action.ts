import { Action } from '@src/utils/data.interface'
import { log } from 'wechaty'

const PRE = 'configManage'

export const configManage: Action = async (g, message, commandObject) => {
  const bot = g.bot
  const command = commandObject.command
  const target = commandObject.target
  
  switch (command) {

    case 'addAllowedRoom':
      const roomToAdd = await bot.Room.find({ topic: target })
      if (roomToAdd) {
        if (g.rooms.includes(roomToAdd)) {
          log.info(PRE, `room ${ target } already allowed`)
          g.commander.say(`room ${ target } already allowed`)
          return
        }
        log.info(PRE, `add room ${ target } to allowed room list`)
        g.rooms.push(roomToAdd)
        g.roomNameList.push(await roomToAdd.topic())
        g.commander.say(`add room ${ target } to allowed room list`)
      } else {
        log.info(PRE, `cannot find room ${ target }`)
        g.commander.say(`cannot find room ${ target }`)
      }
      break

  }

}