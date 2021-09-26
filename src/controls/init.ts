import { Global } from '../utils/data.interface'
import { log } from "wechaty"
import config from '@config/base.config'

const PRE = 'init'

export const init = async (g: Global): Promise<void> => {
  const bot = g.bot
  const targetPromise = bot.Contact.find({
    name: config.targetContactName
  })
  const commanderPromise = bot.Contact.find({ 
    name: config.commanderContactName
  })
  const results = await Promise.all([targetPromise, commanderPromise])
  g.target = results[0]
  g.commander = results[1]
  log.info(PRE, `commander: ${ g.commander?.name() }, target: ${ g.target?.name() }`)
  if (!g.commander) {
    log.warn(PRE, `cannot find commander ${ config.commanderContactName }, you should talk to the commander first to ensure it's in conversation list if you are using web wechat puppet ,quiting...`)
    await bot.stop()
    process.exit(0)
  } else {
    if (!g.target) {
      await g.commander.say(`did not find contact ${config.targetContactName }, using commander as contact.`)
      g.target = g.commander
    }
    log.info(PRE, `initialized`)
    await g.commander.say(`mouthpiece is ready!`)
    g.ready = true
  }
}