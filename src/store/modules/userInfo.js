// import { loginByUsername } from '@/api/login'

const userInfo = {
  state: {
    uid: ''
  },

  mutations: {
    SET_UID: (state, uid) => {
      state.uid = uid
    }
  },

  actions: {
    // 用户名登录,获取uid
    getUidByUsername({ commit }, uid) {
    //   console.log('aaa', uid)
      return new Promise((resolve, reject) => {
        commit('SET_UID', uid)
        resolve()
      })
    }
  }
}

export default userInfo
