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
import ToDos from "./views/ToDos.vue";
import MyProfile from "./views/MyProfile.vue";
import Login from "./views/Login.vue";
import ItemEdit from "./views/ItemEdit.vue";
import Orders from "./views/Orders.vue";
import OrderDetails from "./views/OrderDetails.vue";
import Inventory from "./views/Inventory.vue";
import ServiceList from "./views/ServiceList.vue";
import ServiceEdit from "./views/ServiceEdit.vue";
import AnnouncementList from "./views/AnnouncementList.vue";
import AnnouncementEdit from "./views/AnnouncementEdit.vue";
import Employees from "./views/Employees.vue";
import EmployeeEdit from "./views/EmployeeEdit.vue";

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
      path: "/todos",
      name: "todos",
      component: ToDos
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
      path: "/confirmation/:id",
      name: "confirmation",
      component: Confirmation,
      props: true
    },
    {
      path: "/track",
      name: "track",
      component: Track
    },
    {
      path: "/status/:id",
      name: "status",
      component: Status,
      props: true
    },
    {
      path: "/orders",
      name: "orders",
      component: Orders
    },
    {
      path: "/orderDetails/:id",
      name: "orderDetails",
      component: OrderDetails,
      props: true
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
      path: "/itemedit/:id",
      name: "itemedit",
      component: ItemEdit,
      props: true
    },
    {
      path: "/servicelist",
      name: "servicelist",
      component: ServiceList
    },
    {
      path: "/serviceedit/:id",
      name: "serviceedit",
      component: ServiceEdit,
      props: true
    },
    {
      path: "/announcementlist",
      name: "announcementlist",
      component: AnnouncementList
    },
    {
      path: "/announcementedit/:id",
      name: "announcementedit",
      component: AnnouncementEdit,
      props: true
    },
    {
      path: "/employees",
      name: "employees",
      component: Employees
    },
    {
      path: "/employeeedit/:id",
      name: "employeeedit",
      component: EmployeeEdit,
      props: true
    }
  ]
});
