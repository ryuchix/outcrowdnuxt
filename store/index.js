// import cookies from 'js-cookie';
// import axios from "axios";

// export const state = () => ({
//   token: null,
// });

// export const mutations = {
//   SET_TOKEN(state, token) {
//     state.token = token;
//   },

//   REMOVE_TOKEN(state) {
//     state.token = null;
//   }
// };

// export const actions = {
//   setToken({commit}, data) {
//     this.$axios.setToken(data.token, 'Bearer');
//     const expiryTime = new Date(new Date().getTime() + data.expiresIn * 1000);
//     cookies.set('x-access-token', data.token, {expires: expiryTime});
//     commit('SET_TOKEN', data.token);
//   },

//   logout({commit}) {
//     this.$axios.setToken(false);
//     cookies.remove('x-access-token');
//     commit('REMOVE_TOKEN');
//   }
// };

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  }
}