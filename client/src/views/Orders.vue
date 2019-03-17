<template>
<div class="orders">
  <AdminHeader/>
  <body>
    <h3 class="title" style="text-align: center">Orders</h3>
    <div style="padding-bottom: 20px">
      <div style="white-space:nowrap; display:inline">
        <p>Filter By Status: </p>
        <select v-model="stat" v-on:change="filterStatus()">
          <option value="Any">Any</option>
          <option value="In Process">In Process</option>
          <option value="Ready to Ship">Ready to Ship</option>
          <option value="Shipped">Shipped</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Ready for Pickup">Ready for Pickup</option>
          <option value="Complete">Complete</option>
        </select>
      </div>
      <div style="padding-left: 30px; white-space:nowrap; display:inline">
        <button class="button" v-on:click="sortByDate">Sort by Date</button>
      </div>
    </div>
    <div v-for="(item, index) in filteredOrders" v-bind:key="index" style="padding: 13px">
      <div class="columns list-group-item">
        <div class="column is-4">
          <p>Order #: {{ item.orderNumber }}</p>
        </div>
        <div class="column is-4">
          <p>Status: {{ item.status }}</p>
        </div>
        <div class="column is-2">
          <p>Order Date: {{ item.orderMonth }}/{{ item.orderDay }}/{{ item.orderYear }}</p>
        </div>
        <div class="column is-2">
          <router-link
            class="button"
            :to="{path: '/orderDetails/'+ item.orderNumber}"
            exact-active-class="is-active"
          >View</router-link>
        </div>
      </div>
    </div>
  </body>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";
import AdminHeader from "@/components/AdminHeader.vue";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { iProduct } from "@/models/product.interface";

@Component({
  components: {
    Footer,
    AdminHeader
  }
})
export default class Orders extends Vue {
  shippingItem: Shipping = {
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: ""
  };

  billingItem: Billing = {
    firstName: "",
    lastName: "",
    cardNumber: "",
    expiration: "",
    cvv: ""
  };

  item: Order = {
    orderNumber: 0,
    status: "",
    shippingYN: "",
    orderMonth: 0,
    orderDay: 0,
    orderYear: 0,
    shipping: this.shippingItem,
    billing: this.billingItem,
    prods: this.$store.state.cart
  };

  orders: Order[] = [];

  filteredOrders: Order[] = [];

  stat: string = "Any";

  rev: boolean = false;

  mounted() {
    axios.get(APIConfig.buildUrl("/orders")).then(response => {
      this.orders = response.data.order;
      this.filteredOrders = response.data.order;
    });
  }

  sortByDate() {
    if (this.rev == true) {
      this.rev = false;
    }
    else {
      this.rev = true;
    }
    this.filteredOrders = this.filteredOrders.reverse();
  }

  filterStatus() {
    if (this.stat == "Any") {
      this.filteredOrders = this.orders;
    }
    else {
      this.filteredOrders = [];
      for (let item in this.orders) {
        if (this.orders[item].status == this.stat) {
          this.filteredOrders.push(this.orders[item]);
        }
      }
    }
    if (this.rev == true) {
      this.filteredOrders = this.filteredOrders.reverse();
    }
  }
}

export interface Order {
  orderNumber: number;
  status: string;
  shippingYN: string;
  orderMonth: number;
  orderDay: number;
  orderYear: number;
  shipping: Shipping;
  billing: Billing;
  prods: iProduct[];
}

export interface Billing {
  firstName: string;
  lastName: string;
  cardNumber: string;
  expiration: string;
  cvv: string;
}

export interface Shipping {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
}
</script>

<style scoped>
.column {
  margin: auto;
  width: 25%;
}

.center {
  text-align: center;
}

.list-group-item {
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
}
</style>
