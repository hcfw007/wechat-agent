import { Contact, Wechaty } from 'wechaty'

export default class mpContact {
  bot: Wechaty
  contactList: Contact[]

  constructor(bot: Wechaty) {
    this.bot = bot
    this.fetchContactList()
  }

  public getContactList() {
    if (this.contactList) {
      return this.contactList
    } else {
      return this.fetchContactList()
    }
  }

  private async fetchContactList() {
    this.contactList = await this.bot.Contact.findAll()
    return this.contactList
  }
}

