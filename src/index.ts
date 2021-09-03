import { Wechaty, ScanStatus } from "wechaty"
import { QRCodeTerminal } from 'wechaty-plugin-contrib'
import config from './base.config'

const qrCodeConfig = {
  small: true,   // default: false - the size of the printed QR Code in terminal
}

const bot = new Wechaty()
const $mp:any = {}
bot.use(QRCodeTerminal(qrCodeConfig))
bot
  .on("scan", (qrcode, status) => {
    if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
      console.log('Scan QR code to login')
      if (!$mp.scanTimeout) {
        $mp.scanTimeout = setTimeout(() => {
          throw new Error('Scan QR code Timeout')
          process.exit()
        }, config.maxLoginTime)
      }
    }
  })
  .on("login", (user) => {
    console.log(`User ${user} logged in`)
    if ($mp.scanTimeout) {
      clearTimeout($mp.scanTimeout)
      delete $mp.scanTimeout
    }
  })
  .on("message", (message) => console.log(`Message: ${message}`))

async function main() {
  
  await bot.start()
}

main().catch(console.error)