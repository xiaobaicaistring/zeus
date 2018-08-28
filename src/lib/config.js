import Fingerprint from 'fingerprintjs'
const fingerprint = new Fingerprint().get()

const _config = {
  namespace: '', // 命名空间
  id: 0, // 上报 id
  fingerprint: fingerprint, // 客户端指纹
  userid: 0, // user id
  ext: {}, // 扩展参数 用于自定义上报
  level: 3, // 错误级别 1-debug 2-info 3-error
  ignore: [], // 忽略某个错误, 支持 Regexp 和 Function
  random: 1, // 抽样 (0-1] 1-全量
  delay: 1000, // 延迟上报 combo 为 true 时有效
  repeat: 5, // 重复上报次数(对于同一个错误超过多少次不上报),
  offlineLog: false,
  offlineLogExp: 5 // 离线日志过期时间 ， 默认5天
}
export default _config
