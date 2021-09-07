import { Contact, Wechaty } from 'wechaty'
import config from '@config/base.config'
import { ContactType } from 'wechaty-puppet'

export default class mpContact {
  bot: Wechaty
  contactList: Contact[]
  targetContact: Contact

  constructor(bot: Wechaty) {
    this.bot = bot
    this.fetchContactList()
  }

  public getContactList() {
    if (this.contactList) {
      return this.contactList
    } else {
      return this.fetchContactList
    }
  }

  public getTargetContact() {
    return this.bot.Contact.find(config.targetContactName)
  }

  private async fetchContactList() {
    this.contactList = await this.bot.Contact.findAll()
    return this.contactList
  }
}

