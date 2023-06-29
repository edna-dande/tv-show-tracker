import { createStore } from 'vuex';
import axios from 'axios';

const getDefaultState = () => {
  return {
    token: '',
    user: {}
  };
};

export default createStore({
  state: getDefaultState(),
  getters: {
    isLoggedIn(state) {
      return !!state.token;
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
    login: ({ commit, dispatch }, { token, user }) => {
      commit('setToken', token);
      commit('setUser', user);
      // set auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    logout: ({ commit }) => {
      commit('reset', '');
    }
  },
  modules: {
  }
})
