import requestDjango from '@/utils/requestDjango'
import requestSpring from '@/utils/requestSpring'

export function sumSearchAction(data) {
  return requestSpring({
    url: '/search/sumSearchAction',
    method: 'post',
    header: { 'content-type': 'application/json' },
    data: {
      recentDay: 7,
      uid: '0a6a4fac0f2845708c5bfc1be8a25b7b'
    }
  })
}

export function statisticSearchInfo(uid) {
  return requestSpring({
    url: '/search/statisticSearchInfo',
    method: 'post',
    header: { 'content-type': 'application/json' },
    data: {
      uid: '0a6a4fac0f2845708c5bfc1be8a25b7b'
    }
  })
}

export function listLocation(uid) {
  return requestSpring({
    url: '/location/list',
    method: 'post',
    header: { 'content-type': 'application/json' },
    data: {
      interval: 5,
      uid: '0a6a4fac0f2845708c5bfc1be8a25b7b'
    }
  })
}

export function listWeather(uid) {
  return requestSpring({
    url: '/weather/listInfo',
    method: 'post',
    header: { 'content-type': 'application/json' },
    data: {
      uid: '0a6a4fac0f2845708c5bfc1be8a25b7b'
    }
  })
}

// type:1 book 2 movie 3 music
export function searchAction(uid, content, type) {
  return requestSpring({
    url: '/search/searchAction',
    method: 'post',
    header: { 'content-type': 'application/json' },
    data: {
      'userId': uid,
      'content': content,
      'type': type
    }
  })
}

export function listSumSearchAction(data) {
  return requestSpring({
    url: '/search/listSumSearchAction',
    method: 'post',
    header: { 'content-type': 'application/json' },
    data: { recentDay: 7 }
  })
}

export function searchBook(content) {
  console.log('llll')
  return requestDjango({
    url: '/searchBook',
    method: 'post',
    data: { 'content': content }
  })
}

export function searchMusic(content) {
  return requestDjango({
    url: '/searchMusic',
    method: 'post',
    data: { 'content': content }
  })
}

export function searchVideo(content) {
  return requestDjango({
    url: '/searchVideo',
    method: 'post',
    data: { 'content': content }
  })
}

export function fetchRecommendBook() {
  return requestDjango({
    url: '/recommendBook',
    method: 'get'
  })
}

export function fetchRecommendMusic() {
  return requestDjango({
    url: '/recommendMusic',
    method: 'get'
  })
}

export function fetchRecommendVideo() {
  return requestDjango({
    url: '/recommendVideo',
    method: 'get'
  })
}
