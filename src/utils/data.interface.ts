import { Wechaty, Contact, Room, Message } from 'wechaty'


export interface Global {
  bot: Wechaty
  target: Contact | null,
  commander: Contact | null,
  scanTimeout?: NodeJS.Timeout,
  ready: boolean,
  rooms: Array<Room>,
  roomNameList: Array<string>,
}

export interface CommandObject {
  command: string,
  [property: string]: string
}

export interface Action {
  (g: Global, message: Message, commandObject: CommandObject): Promise<void>
}