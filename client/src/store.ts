import Vue from "vue";
import Vuex, { MutationTree, ActionTree } from "vuex";

import { APIConfig } from "./utils/api.utils";
import axios, { AxiosResponse } from "axios";

import { iUser } from "@/models/user.interface";

import { iProduct } from "@/models/product.interface";

Vue.use(Vuex);

interface iRootState {
  userToken: string | null;
  user: iUser | null;
  cart: { [key: number]: iProduct }; // cart is a map of iProduct id numbers to iProducts
}

interface iLoginPayload {
  token: string;
  userid: number;
}

const state: iRootState = {
  userToken: null,
  user: null,
  cart: {}
};

const mutations: MutationTree<iRootState> = {
  setUser(state, payload) {
    state.user = payload.user;
  },
  login(state, payload) {
    const { token, user } = payload;
    state.userToken = token;
    state.user = user;
  },
  logout(state) {
    state.userToken = null;
    state.user = null;
  },
  // given an iRootState and an iProduct, mutate the cart. O(1) runtime
  // NOTE: id 0 is not possible in mysql so expect payload.id never 0
  addToCart(state: iRootState, product: iProduct) {
    if (product.inventoryQuantity <= product.cartQuantity) {
      // if out of stock
      console.log("out of stock",product.inventoryQuantity,"<=",product.cartQuantity);
      alert("out of stock");
    } else { 
      // else have stock, so grab another off the shelves
      product.cartQuantity++;
      state.cart[product.id] = product;
    }
  }
};

const actions: ActionTree<iRootState, iRootState> = {
  fetchUser({ commit }, payload) {
    const { userid } = payload;
    return axios
      .get(APIConfig.buildUrl(`/users/${userid}`))
      .then((res: AxiosResponse<{ user: iUser }>) => {
        commit("setUser", { user: res.data.user });
        return res.data.user;
      });
  },
  login({ commit, dispatch }, payload) {
    const { userid, token } = payload;
    dispatch("fetchUser", { userid }).then(user => {
      commit("login", { user, token });
    });
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
