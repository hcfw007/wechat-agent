import { DailyQuest } from '@src/controls/dailyQuest'
import { Wechaty, Contact, Room, Message } from 'wechaty'
import { Stat } from './classes'

export interface Global {
  bot: Wechaty
  target: Contact | null,
  commander: Contact | null,
  scanTimeout?: NodeJS.Timeout,
  ready: boolean,
  rooms: Array<Room>,
  roomNameList: Array<string>,
  contacts: Array<Contact>,
  contactNameList: Array<string>,
  stat: Stat,
  dailyQuests: Array<DailyQuest>
}

export interface CommandObject {
  command: string,
  [property: string]: string
}

export interface Action {
  (g: Global, message: Message, commandObject: CommandObject): Promise<void>
}