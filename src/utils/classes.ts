export class Stat {
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
      `收到消息数：${this.messageReceived}
转发消息数：${this.messageForwarded}
收到命令数：${this.commandAccepted}
发送消息数: ${this.messageSend}`
    return result
  }
}