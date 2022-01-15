import { kick } from './actions/kick.action'
import { info } from './actions/info.action'
import { say } from './actions/say.action'
import { configManage } from './actions/configManage.action'
import { list } from './actions/list.action'
import { stat } from './actions/stat.action'

import { Action } from '@src/utils/data.interface'

const actionDescription = {
  kick: '踢掉$room中的$target',
  info: '获取mouthpiece基本信息',
  configManage: '根据$command进行配置管理，目前支持addAllowedRoom，将$target的群加入群聊白名单',
  say: '在$in群聊或者对$to说话，内容是$content，单聊优先',
  list: '列出现有联系人和群名',
  help: '使用说明',
  stat: '获取当前统计情况'
}

const help: Action = async (g) => {
  let result = ''
  for (const action in actions) {
    result += `${action}: ${actionDescription[action]} \n`
  }
  await g.commander.say(result)
}

export const actions = {
  kick,
  info,
  say,
  configManage,
  list,
  help,
  stat,
}
