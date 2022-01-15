import { DailyQuest } from "@src/controls/dailyQuest"

export class Stat {
  messageReceived: number
  messageForwarded: number
  commandAccepted: number
  messageSend: number

  overallMessageReceived: number
  overallMessageForwarded: number
  overallCommandAccepted: number
  overallMessageSend: number
  dailyReset: DailyQuest

  constructor() {
    this.messageReceived = 0
    this.messageForwarded = 0
    this.commandAccepted = 0
    this.messageSend = 0

    this.overallMessageReceived = 0
    this.overallMessageForwarded = 0
    this.overallCommandAccepted = 0
    this.overallMessageSend = 0

    this.dailyReset = new DailyQuest('daily stat reset', this.reset.bind(this), 0, 0)
    this.dailyReset.start()
  }

  toOutputString(): string {
    const result =
      `今日数据统计：
收到消息数：${this.messageReceived}
转发消息数：${this.messageForwarded}
收到命令数：${this.commandAccepted}
发送消息数: ${this.messageSend}`
    return result
  }

  toOverallOutputString(): string {
    const result =
      `总体数据统计：
收到消息数：${this.overallMessageReceived + this.messageReceived}
转发消息数：${this.overallMessageForwarded + this.messageForwarded}
收到命令数：${this.overallCommandAccepted + this.commandAccepted}
发送消息数: ${this.overallMessageSend + this.messageSend}`
    return result
  }

  reset() {
    this.overallMessageReceived += this.messageReceived
    this.overallMessageForwarded += this.messageForwarded
    this.overallCommandAccepted += this.overallCommandAccepted
    this.overallMessageSend += this.overallMessageSend

    this.messageReceived = 0
    this.messageForwarded = 0
    this.commandAccepted = 0
    this.messageSend = 0
  }
}