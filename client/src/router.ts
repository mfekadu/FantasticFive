import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Cart from "./views/Cart.vue";
import Checkout from "./views/Checkout.vue";
import Confirmation from "./views/Confirmation.vue";
import Track from "./views/Track.vue";
import Status from "./views/Status.vue";
import Login from "./views/Login.vue";
import Inventory from "./views/Inventory.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart
    },
    {
      path: "/checkout",
      name: "checkout",
      component: Checkout
    },
    {
      path: "/confirmation",
      name: "confirmation",
      component: Confirmation
    },
    {
      path: "/track",
      name: "track",
      component: Track
    },
    {
      path: "/status",
      name: "status",
      component: Status
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/inventory",
      name: "inventory",
      component: Inventory
    }
  ]
});
