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