import Vue from "vue";
import Vuex, { MutationTree, ActionTree } from "vuex";

import { APIConfig } from "./utils/api.utils";
import axios, { AxiosResponse } from "axios";

import { iUser } from "@/models/user.interface";

import { iProduct, createEmptyProduct} from "@/models/product.interface";

Vue.use(Vuex);

interface iRootState {
  userToken: string | null;
  user: iUser | null;
  cart: { [key:number]: iProduct }; // cart is a map of iProduct id numbers to iProducts
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
  // O(1) runtime
  // NOTE: id 0 is not possible in mysql
  addToCart(state, payload){
    payload.cartQuantity++;
    state.cart[payload.id] = payload;
  },
  // function that can mutate the cart. 
  // O(n) runtime, consider hashtable with key = state.cart.id for O(1)
  addToCartWithArray(state, payload) {
    // // if (state.cart === null) {
    //   // state.cart[payload.id] = payload;
    //   // return;
    // // }

    // let didUpdateQuantity: boolean = false;
    // // loop over the cart
    // console.log("addtoCart")
    // for (let i = 0; i < state.cart.length; i++) {
    //   // if product id already in cart and there is stock
    //   if (state.cart[i].id == payload.id &&
    //       state.cart[i].inventoryQuantity > state.cart[i].cartQuantity
    //   ) {
    //     // increment the cartQuantity and stop looping
    //     state.cart[i].cartQuantity++;
    //     didUpdateQuantity = true;
    //     console.log("inLoop",state.cart, "didup...", didUpdateQuantity);
    //     break;
    //   }
    // }
    // // after looping, if this is a new addition to the cart
    // if (didUpdateQuantity === false) {
    //   state.cart.push(payload);
    //   console.log("afterLoop",state.cart, "didUp???", didUpdateQuantity);
    // }
    // console.log("endFunc",state.cart, "didUp???", didUpdateQuantity);
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
