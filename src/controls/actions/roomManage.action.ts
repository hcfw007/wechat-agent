import { Action } from '@src/utils/data.interface'
import { log } from 'wechaty'

const PRE = 'roomManage'

export const roomManage: Action = async (g, message, commandObject) => {
  const bot = g.bot
  const roomCommand = commandObject.roomCommand
  const roomTargetStr = commandObject.target
  
  switch (roomCommand) {

    case 'add':
      const roomToAdd = await bot.Room.find({ topic: roomTargetStr })
      if (roomToAdd) {
        if (g.rooms.includes(roomToAdd)) {
          log.info(PRE, `room ${roomTargetStr} already allowed`)
          g.commander.say(`room ${roomTargetStr} already allowed`)
          return
        }
        log.info(PRE, `add room ${ roomTargetStr } to allowed room list`)
        g.rooms.push(roomToAdd)
        g.roomNameList.push(await roomToAdd.topic())
        g.commander.say(`add room ${ roomTargetStr } to allowed room list`)
      } else {
        log.info(PRE, `cannot find room ${ roomTargetStr }`)
        g.commander.say(`cannot find room ${ roomTargetStr }`)
      }
      break

  }

}