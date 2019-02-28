<template>
<div class="orders">
  <AdminHeader/>
  <body>
    <h3 class="title" style="text-align: center">Orders</h3>
    <div v-for="(item, index) in orders" v-bind:key="index">
      <div class="columns list-group-item">
        <div class="column is-4">
          <p>Order #: {{ item.orderNumber }}</p>
        </div>
        <div class="column is-4">
          <p>Status: {{ item.status }}</p>
        </div>
        <div class="column is-2">
          <button class="button">
            <router-link to="/orderDetails" exact-active-class="is-active">View</router-link>
          </button>
        </div>
        <div class="column is-2">
          <button class="button">Delete</button>
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

@Component({
  components: {
    Footer,
    AdminHeader
  }
})
export default class Orders extends Vue {
  item: Order = {
    orderNumber: 0,
    status: "",
    shippingYN: "",
    firstShip: "",
    lastShip: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    firstBill: "",
    lastBill: "",
    cardNumber: "",
    expiration: "",
    cvv: ""
  };

  orders: Order[] = [];

  mounted() {
    axios.get(APIConfig.buildUrl("/orders")).then(response => {
      this.orders = response.data.order;
    });
  }
}

export interface Order {
  orderNumber: number;
  status: string;
  shippingYN: string;
  firstShip: string;
  lastShip: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  firstBill: string;
  lastBill: string;
  cardNumber: string;
  expiration: string;
  cvv: string;
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
