import { log } from "wechaty"

const PRE = 'DailyQuest'

export class DailyQuest {
  hour: number
  minute: number
  fn: Function
  on: Boolean
  timeout: NodeJS.Timeout
  name: string

  constructor(name: string, fn: Function, hour: number, minute: number) {
    log.info(PRE, `constructor(${ name }, fn,  ${ hour }, ${ minute })`)
    this.name = name
    this.fn = fn
    this.hour = hour
    this.minute = minute
    this.on = false
  }

  start() {
    log.info(PRE, `${ this.name } start()`)
    this.on = true
    this.setUpNext()
  }

  stop() {
    log.info(PRE, `${this.name} off()`)
    this.on = false
    clearTimeout(this.timeout)
  }

  setUpNext() {
    const date = new Date()
    date.setHours(this.hour)
    date.setMinutes(this.minute)
    date.setSeconds(0)
    if (date < new Date()) {
      date.setDate(date.getDate() + 1)
    }
    log.info(PRE, `${this.name} setUpNext(), currentTime: ${ new Date().toLocaleString() }, nextTime: ${ date.toLocaleString() }`)
    this.timeout = setTimeout(() => {
      this.fn()
      this.setUpNext()
    }, date.getTime() - (new Date()).getTime())
  }
}