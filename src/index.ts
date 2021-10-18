import { Wechaty, ScanStatus, log, WechatyOptions } from 'wechaty'
import { QRCodeTerminal } from 'wechaty-plugin-contrib'
import config from '@config/base.config'
import { Global } from './utils/data.interface'
import { init } from './controls/init'
import { handleMessage } from './controls/messages'
import { donutToken } from '@config/token'

const PRE = 'index'

const qrCodeConfig = {
  small: true,   // default: false - the size of the printed QR Code in terminal
}

const wechatyOption: WechatyOptions = {}
if (donutToken) {
  wechatyOption.puppet = 'wechaty-puppet-service'
  wechatyOption.puppetOptions = {
    toke: donutToken,
  }
} else {
  log.info(PRE, 'no token provided, using web puppet to demonstrate, some function may not be working properly')
}

const bot = new Wechaty(wechatyOption)
const $mp:Global = {
  bot,
  target: null,
  commander: null,
  ready: false,
  rooms: [],
  roomNameList: [],
}

bot.use(QRCodeTerminal(qrCodeConfig))
bot
  .on('scan', (qrcode, status) => {
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
  }).on('login', (user) => {
    log.info(`User ${user}, id ${ user.id } logged in`)
    if ($mp.scanTimeout) {
      clearTimeout($mp.scanTimeout)
      delete $mp.scanTimeout
    }
  })
  .on('ready', async () => {
    await init($mp)
  })
  .on('message', async (message) => {
    handleMessage($mp, message)
  })

async function main() {
  
  await bot.start()
}

main().catch(console.error)