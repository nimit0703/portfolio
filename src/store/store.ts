import { createStore } from "vuex";

// Create a new store instance.
export default createStore({
  state() {
    return {
      theme: "dark",
    };
  },
  mutations: {
    changeTheme(state: any, newTheme: string) {
      state.theme = newTheme;
    },
  },
  getters: {
    currentTheme: (state:any) => {
      return state.theme;
    },
  },
});
