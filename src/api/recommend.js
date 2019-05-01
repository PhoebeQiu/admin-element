import request from '@/utils/request'
import requestSpring from '@/utils/requestSpring'

// 登录
export function login(content, password, type) {
  const data = {
    content,
    password,
    type
  }
  return requestSpring({
    url: '/user/login',
    method: 'post',
    header: { 'content-type': 'application/json' },
    data
  })
}

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

