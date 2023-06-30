import { createStore } from 'vuex';
import axios from 'axios';
import createPersistedState from "vuex-plugin-persistedstate";

const getDefaultState = () => {
  return {
    token: '',
    user: {}
  };
};

export default createStore({
  state: getDefaultState(),
  plugins: [createPersistedState()],
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
    getToken(state) {
      return state.token;
    },
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    reset(state) {
      Object.assign(state, getDefaultState());
    }
  },
  actions: {
    loginAction: ({ commit, dispatch }, { token, user }) => {
      commit('setToken', token);
      commit('setUser', user);
      // set auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    logoutAction: ({ commit }) => {
      commit('reset', '');
    }
  },
  modules: {
  }
})
