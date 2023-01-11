# wechat-agent

注意：这一项目已停止更新，因为个人微信的 puppet-service donut 已停止服务。

[![Publish](https://github.com/hcfw007/wechat-agent/actions/workflows/publish.yml/badge.svg)](https://github.com/hcfw007/wechat-agent/actions/workflows/publish.yml)

一个wechat机器人，主要功能是转发聊天信息到指定微信上，适合拥有多个微信但主要使用其中一个的人。开发依赖wechaty开源项目，请访问[官网](https://wechaty.js.org/)获取更多信息。

使用时依赖wechaty-token，详情请参考[这里](https://wechaty.js.org/docs/puppet-services/)。大部分提供商都可以试用，通过发博客贡献内容可获取长达一年的使用权。理论上来说所有token都可兼容，但实际根据底层实现可能需要修改。开发时基于puppet-donut进行。

## 使用前配置

token.ts

存储所需使用的wechaty-token。也可通过DONUT_TOKEN的环境变量配置。

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
