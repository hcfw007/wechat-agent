import { Wechaty, Contact, Room } from 'wechaty'


export interface Global {
  bot: Wechaty
  target: Contact | null,
  commander: Contact | null,
  scanTimeout?: NodeJS.Timeout,
  ready: boolean,
  rooms: Array<Room>,
  roomNameList: Array<string>,
}