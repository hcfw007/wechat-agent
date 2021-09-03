import { Wechaty, ScanStatus } from "wechaty"
import { QRCodeTerminal } from 'wechaty-plugin-contrib'

const config = {
  small: true,   // default: false - the size of the printed QR Code in terminal
}

async function main() {
  const bot = new Wechaty()
  bot.use(QRCodeTerminal(config))
  bot
    .on("scan", (qrcode, status) => {
      console.log('Scan QR code to login')
    })
    .on("login", (user) => console.log(`User ${user} logged in`))
    .on("message", (message) => console.log(`Message: ${message}`))
  await bot.start()
}

main().catch(console.error)