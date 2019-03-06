import Vue from "vue";
import Vuex, { MutationTree, ActionTree } from "vuex";

import { APIConfig } from "./utils/api.utils";
import axios, { AxiosResponse } from "axios";

import { iUser } from "@/models/user.interface";

import { iProduct } from "@/models/product.interface";

Vue.use(Vuex);

const toast = (message: string, type: string) => { 
  let x = document.getElementById("toast");
  let y = document.getElementById("desc");
  y!.textContent = message;
  let newClass = `${type} show`;
  x!.className = newClass;
  setTimeout(() => { x!.className = x!.className.replace(newClass, ""); }, 2000);
};

const oos = (title: string) => {
  var x = document.getElementById("oos")
  x!.className = "show";
}

interface iRootState {
  userToken: string | null;
  user: iUser | null;
  userID: number;
  firstName: string;
  admin: boolean;
  cart: { [key: number]: iProduct }; // cart is a map of iProduct id numbers to iProducts
}

interface iLoginPayload {
  token: string;
  userid: number;
}

const state: iRootState = {
  userToken: null,
  user: null,
  userID: 0,
  firstName: "",
  admin: false,
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
  // given an iRootState and an iProduct, mutate the cart by adding the product. O(1) runtime
  // NOTE: id 0 is not possible in mysql so expect payload.id never 0
  // test case: (3 Trek Bikes in stock) add 2 Trek Bikes, click Cart, notice 2 Trek Bikes in cart, 
  // ... click Shop, add 1 Trek Bike, add 1 more, notice alert, click Cart, notice 3 Trek Bikes in cart
  addToCart(state: iRootState, product: iProduct) {
    const productInCart: boolean = state.cart[product.id] ? true : false;
    const inventoryQuantity: number = productInCart ? state.cart[product.id].inventoryQuantity : 0; 
    const cartQuantity: number = productInCart ? state.cart[product.id].cartQuantity : 0;
    const productIsOutOfStock: boolean = productInCart && (inventoryQuantity <= cartQuantity);

    // catch out of stock
    if (productInCart && productIsOutOfStock) {
      console.log("out of stock",state.cart[product.id].inventoryQuantity,"<=",state.cart[product.id].cartQuantity);
      let message = "SORRY! OUT OF STOCK!";
      let type = "notification is-danger";
      toast(message, type);
      return;
    }

    if (productInCart) {
      // have stock, so grab another off the shelves
      state.cart[product.id].cartQuantity++;
    } else {
      // otherwise add the product to the cart
      state.cart[product.id] = product;
      state.cart[product.id].cartQuantity++;
    }

    // notify user of cart addition
    let message = `${state.cart[product.id].cartQuantity} of ${product.title} in cart!`
    let type = "notification is-primary";
    toast(message, type);
  },
  // given an iRootState and an iProduct, mutate cart by removing the given iProduct by id
  deleteFromCart(state: iRootState, product: iProduct) {
    // make sure they want it by clicking OK, CANCEL means false
    if (confirm("delete " + product.title + " from cart?") === true) {
      delete state.cart[product.id];
    }
  },
  // given state and product, mutate the cart by setting the cart product object's quantity to the one given.
  setProductQuantityInCart(state: iRootState, product: iProduct) {
    state.cart[product.id].cartQuantity = product.cartQuantity;
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
