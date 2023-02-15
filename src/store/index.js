import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);
const types = {
  SET_LOGIN: 'SET_LOGIN',
  SET_USER: 'SET_USER',

};
const state = {
  form: {},
  daolupage: 109,
  token: "",
  imgUrl: 'http:/image.player1314.xyz',
  isLogin: false,
  user: {},
  expiretime: ''
};
const actions = {
  setLogin: ({
    commit
  }, isLogin) => {
    commit(types.SET_LOGIN, isLogin);
  },
  setUser: ({
    commit
  }, user) => {
    commit(types.SET_USER, user);

  },
  setExpiretime: ({
    commit
  }, time) => {
    commit('set_expiretime', time)
  }
};
const getters = {};
const mutations = {
  changeFrom(state, value) {
    state.form = value
  },
  setPage(state, va) {
    state.daolupage = va
  },

  setToken(state, va) {
    state.token = va
  },
  [types.SET_LOGIN](state, isLogin) {
    /*设置是否授权*/

    if (isLogin) state.isLogin = isLogin;

    else state.isLogin = false;

  },

  /*类型，参数*/

  [types.SET_USER](state, user) {
    if (user) state.user = user;
    else state.user = {};
  },
  set_expiretime(state, time) {
    state.expiretime = time;

  }
};
export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
});
