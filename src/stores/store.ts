// store.ts
import { AlertInterface } from "@/Interfaces/store";
import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { ActionContext } from "vuex/types/index.js";

// Define your typings for the store state
export interface State {
  count: number;
  alertDetails: AlertInterface;
}

// Define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    count: 0,
    alertDetails: {
      showAlert: false,
      closable: true,
      title: "Alert Title",
      icon: "toogle-switch",
      text: "lorem ipsum dolor sit amet, consectetur",
      variant: "tonal",
    } as AlertInterface,
  },

  // Getters
  getters: {
    getAlertDetails(state: { alertDetails: AlertInterface }): AlertInterface {
      return state.alertDetails;
    },
  },

  // Actions
  actions: {
    updateAlertDetails(
      { commit }: ActionContext<State, State>,
      payload: Partial<AlertInterface>
    ) {
      commit("setAlertDetails", payload);
    },
  },

  // Mutations
  mutations: {
    setAlertDetails(
      state: { alertDetails: any },
      payload: Partial<AlertInterface>
    ) {
      state.alertDetails = { ...payload };
    },
  },
});
