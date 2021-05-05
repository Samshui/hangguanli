const mutations = {

  // 登录
  login(state, info) {
    state.user = info;
  },

  // 登出
  logout(state) {
    state.user = null;
  },

  // 设置token
  setToken(state, info) {
    state.token = info;
  }
};

export default mutations;
