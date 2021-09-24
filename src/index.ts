import { Wechaty, ScanStatus, log } from "wechaty"
import { QRCodeTerminal } from 'wechaty-plugin-contrib'
import config from '@config/base.config'
import { Global } from './utils/data.interface'
import { init } from './controls/init'
import { handleMessage } from './controls/messages'

const qrCodeConfig = {
  small: true,   // default: false - the size of the printed QR Code in terminal
}

const bot = new Wechaty()
const $mp:Global = {
  bot,
  target: null,
  commander: null
}

const PRE = 'index'

bot.use(QRCodeTerminal(qrCodeConfig))
bot
  .on("scan", (qrcode, status) => {
    if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
      log.info('Scan QR code to login')
      if (!$mp.scanTimeout) {
        $mp.scanTimeout = setTimeout(async () => {
          log.info('Scan QR code Timeout')
          await bot.stop()
          process.exit(0)
        }, config.maxLoginTime)
      }
    }
  })
  .on("login", async (user) => {
    log.info(`User ${user} logged in`)
    if ($mp.scanTimeout) {
      clearTimeout($mp.scanTimeout)
      delete $mp.scanTimeout
    }
    await init($mp)
  })
  .on("message", async (message) => {
    handleMessage($mp, message)
  })

async function main() {
  
  await bot.start()
}

main().catch(console.error)