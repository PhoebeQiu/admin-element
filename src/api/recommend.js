// import request from '@/utils/request'
import requestSpring from '@/utils/requestSpring'

export function simpleRecomend(userId) {
  const data = {
    userId
  }
  return requestSpring({
    url: '/recommend/simpleRecommend',
    method: 'post',
    header: { 'content-type': 'application/json' },
    data
  })
}

export function recommendSearchContent(userId, content, type) {
  const data = {
    userId,
    content,
    type
  }
  return requestSpring({
    url: '/recommend/recommendSearchContent',
    method: 'post',
    header: { 'content-type': 'application/json' },
    data
  })
}
