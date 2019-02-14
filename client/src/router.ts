import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Services from "./views/Services.vue";
import Shop from "./views/Shop.vue";
import Cart from "./views/Cart.vue";
import Checkout from "./views/Checkout.vue";
import Confirmation from "./views/Confirmation.vue";
import Track from "./views/Track.vue";
import Status from "./views/Status.vue";
import MyProfile from "./views/MyProfile.vue";
import Login from "./views/Login.vue";
import ItemEdit from "./views/ItemEdit.vue";
import Orders from "./views/Orders.vue";
import OrderDetails from "./views/OrderDetails.vue";
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
      path: "/services",
      name: "services",
      component: Services
    },
    {
      path: "/shop",
      name: "shop",
      component: Shop
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/my-profile",
      name: "myProfile",
      component: MyProfile
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
      path: "/orders",
      name: "orders",
      component: Orders
    },
    {
      path: "/orderDetails",
      name: "orderDetails",
      component: OrderDetails
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
    },
    {
      path: "/itemedit",
      name: "itemedit",
      component: ItemEdit
    }
  ]
});
