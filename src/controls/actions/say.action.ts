import { Action } from '@src/utils/data.interface'
import { Contact, log, Room } from 'wechaty'

const PRE = 'say'

export const say: Action = async (g, message, commandObject) => {
  const bot = g.bot
  const targetContactStr = commandObject.to
  const targetRoomStr = commandObject.in
  const content = commandObject.content

  if (!targetContactStr && !targetRoomStr) {
    log.info(PRE, `no target contact or room priveded`)
    await g.commander.say('no target contact or room priveded')
    return
  }

  if (!content) {
    log.info(PRE, `no content priveded`)
    await g.commander.say('no content priveded')
    return
  }

  let target: Contact | Room = undefined
  let infoStr = `saying ${ content } `

  if (targetContactStr) {
    target = await bot.Contact.find({ name: targetContactStr })
    if (!target) {
      log.info(PRE, `cannot find contact matching name ${ targetContactStr }`)
      await g.commander.say(`cannot find contact matching name ${ targetContactStr }`)
      return
    }
    infoStr += `to contact ${ target.name() }`
  } else {
    target = await bot.Room.find({ topic: targetRoomStr })
    if (!target) {
      log.info(PRE, `cannot find room matching topic ${ targetContactStr }`)
      await g.commander.say(`cannot find contact matching name ${ targetContactStr }`)
      return
    }
    infoStr += `to contact ${ await target.topic() }`
  }
  log.info(PRE, infoStr)
  await target.say(content)
}