# wechat-agent

一个wechat机器人，主要功能是转发聊天信息到指定微信上，适合拥有多个微信但主要使用其中一个的人。

## 使用前配置

token.ts

存储所需使用的 wechaty-token ，如何获取请参考[这里](https://wechaty.js.org/docs/puppet-services/)。也可通过DONUT_TOKEN的环境变量配置。

base.config.ts

maxLoginTime: 登录超时时间，可不修改

targetContactName: 转发目标账号的微信名

commanderContactName: 接收指令账号的微信名，一般与转发目标是同一个

## 指令清单

使用commander向托管微信号发送执行，可执行以下命令。

格式```say to=目标 content=内容```

kick: 踢掉$room中的$target

info: 获取wechaty-agent基本信息

configManage: 根据$command进行配置管理，目前支持addAllowedRoom，将$target的群加入群聊白名单

say: 在$in群聊或者对$to说话，内容是$content，单聊优先

list: 列出现有联系人和群名

help: 使用说明

stat: 获取当前统计情况
