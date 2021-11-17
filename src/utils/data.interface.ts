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

export class stat {
  messageReceived: number
  messageForwarded: number
  commandAccepted: number
  messageSend: number

  constructor() {
    this.messageReceived = 0
    this.messageForwarded = 0
    this.commandAccepted = 0
    this.messageSend = 0
  }

  toOutputString(): string {
    const result =
`收到消息数：${ this.messageReceived }
转发消息数：${ this.messageForwarded }
收到命令数：${ this.commandAccepted }
发送消息数: ${ this.messageSend }`
    return result
  }
}

export interface CommandObject {
  command: string,
  [property: string]: string
}

export interface Action {
  (g: Global, message: Message, commandObject: CommandObject): Promise<void>
}