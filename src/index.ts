import { Wechaty, ScanStatus } from "wechaty"
import { QRCodeTerminal } from 'wechaty-plugin-contrib'
import config from './base.config'
import Contact from './contact'

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
        }, config.maxLoginTime)
      }
    }
  })
  .on("login", async (user) => {
    console.log(`User ${user} logged in`)
    if ($mp.scanTimeout) {
      clearTimeout($mp.scanTimeout)
      delete $mp.scanTimeout
    }
    $mp.contact = await (new Contact(bot).getContactList())
    console.log($mp.contact)
  })
  .on("message", (message) => console.log(`Message: ${message}`))

async function main() {
  
  await bot.start()
}

main().catch(console.error)