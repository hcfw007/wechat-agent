import { Room } from 'wechaty'

export function parsePayload(payload?: string[]): any {
  if (!payload || payload.length === 0) {
    return {}
  }
  const result = {}
  for (const item of payload) {
    result[item.split('=')[0]] = item.split('=')[1]
  }
  return result
}

export async function getRoomNameList(rooms: Array<Room>): Promise<string[]> {
  return await Promise.all(rooms.map(async room => await room.topic()))
}

export function sleep(seconds: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000)
  })
}