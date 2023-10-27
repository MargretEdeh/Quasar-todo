// store/index.js
import { createStore } from 'vuex';
import { auth, googleProvider } from 'src/boot/firebase';
import { signInWithPopup } from 'firebase/auth';

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async signInWithGoogle({ commit }) {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        commit('setUser', user);
        return user;
      } catch (error) {
        console.error('Google Sign-in Error', error.code, error.message, error.email, error.credential);
        throw error;
      }
    },

  },
  getters: {
    isAuthenticated: (state) => state.user !== null,
  },
});
