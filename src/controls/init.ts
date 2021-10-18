import { Global } from '../utils/data.interface'
import { log, Room } from 'wechaty'
import config from '@config/base.config'
import { getRoomNameList, sleep } from '@src/utils/helpers'

const PRE = 'init'

export const init = async (g: Global, retries = 1): Promise<void> => {
  const bot = g.bot

  // setup target and commander
  const targetPromise = bot.Contact.find({
    name: config.targetContactName
  })
  const commanderPromise = bot.Contact.find({ 
    name: config.commanderContactName
  })
  const results = await Promise.all([ targetPromise, commanderPromise ])
  g.target = results[0]
  g.commander = results[1]
  log.info(PRE, `commander: ${ g.commander?.name() }, target: ${ g.target?.name() }`)
  log.verbose(PRE, `commander id: ${ g.commander?.id }, target id: ${ g.target?.id }`)
  if (!g.commander) {
    if (retries > 0 ) {
      log.info(PRE, `cannot find commander ${config.commanderContactName }, try again in 10 seconds`)
      await sleep(10)
      init(g, retries - 1)
    } else {
      log.warn(PRE, `cannot find commander ${ config.commanderContactName }, you should talk to the commander first to ensure it's in conversation list if you are using web wechat puppet ,quiting...`)
      await bot.stop()
      process.exit(0)
    }
  } else {
    if (!g.target) {
      await g.commander.say(`did not find contact ${config.targetContactName }, using commander as contact.`)
      g.target = g.commander
    }
  }

  // setup rooms

  const rooms:Array<Room> = []
  for (const roomName of config.allowedRooms) {
    rooms.push(...await bot.Room.findAll({ topic: roomName }))
  }
  g.rooms = rooms
  g.roomNameList = await getRoomNameList(rooms)
  log.info(PRE, `allowed rooms: ${ g.roomNameList.join(',') }`)

  log.info(PRE, `initialized`)
  await g.commander.say(`mouthpiece is ready!`)
  g.ready = true
}