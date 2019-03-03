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
  // test case: (3 Trek Bikes in stock) add 2 Trek Bikes, click Cart, notice 2 Trek Bikes in cart, 
  // ... click Shop, add 1 Trek Bike, add 1 more, notice alert, click Cart, notice 3 Trek Bikes in cart
  addToCart(state: iRootState, product: iProduct) {
    // if the product is in the cart
    if (state.cart[product.id]) {
      if (state.cart[product.id].inventoryQuantity <= state.cart[product.id].cartQuantity) {
        // if out of stock
        console.log("out of stock",state.cart[product.id].inventoryQuantity,"<=",state.cart[product.id].cartQuantity);
        alert("out of stock");
      } else { 
        // else have stock, so grab another off the shelves
        state.cart[product.id].cartQuantity++;
      }
    } else {
      // otherwise add the product to the cart
      state.cart[product.id] = product;
      state.cart[product.id].cartQuantity++;
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
