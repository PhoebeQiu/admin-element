// import request from '@/utils/request'
import requestSpring from '@/utils/requestSpring'

// 增加互动的信息
// type:1书，2电影
export function common(uid, type, infoId) {
  const data = {
    uid,
    type,
    infoId
  }
  return requestSpring({
    url: '/bury/common',
    method: 'post',
    header: { 'content-type': 'application/json' },
    data
  })
}
