import Vue from "vue";
import Vuex from "vuex";

import mutations from "./mutations";

Vue.use(Vuex);

const state = {
  token: null,
  user: null,
};

const store = new Vuex.Store({
  state,
  mutations
});

export default store;
