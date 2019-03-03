<template>
<div class="orderDetails">
  <AdminHeader/>
  <body>
    <h3 class="title" style="text-align: center">Order# {{ item.orderNumber }}, 
      Order Date: {{ item.orderMonth }}/{{ item.orderDay }}/{{ item.orderYear }}
    </h3>
    <div class="columns">
      <div class="column is-6">
        <div class="columns">
          <div class="column is-6">
            <img
              src="https://www.trekbicyclesuperstore.com/images/library/large/trek-marlin-6-276356-1.jpg"
              alt="Trek Bike"
              style="width:350px;height:170px;"
            >
          </div>
          <div class="column is-6">
            <p>Trek Bike</p>
            <br>
            <p>$699.99</p>
            <br>
            <p>Quantity: 1</p>
          </div>
        </div>
        <div class="columns">
          <div class="column is-6">
            <img
              src="https://www.trekbicyclesuperstore.com/images/library/large/trek-marlin-6-276356-1.jpg"
              alt="Trek Bike"
              style="width:350px;height:170px;"
            >
          </div>
          <div class="column is-6">
            <p>Trek Bike</p>
            <br>
            <p>$699.99</p>
            <br>
            <p>Quantity: 1</p>
          </div>
        </div>
      </div>
      <div class="column is-6">
        <b>Shipping Details</b>
        <br>
        <span>{{ item.shipping.firstName }} {{ item.shipping.lastName }}</span>
        <br>
        <span>{{ item.shipping.address1 }}, {{ item.shipping.address2 }}</span>
        <br>
        <span>{{ item.shipping.city }}, {{ item.shipping.state }}, {{ item.shipping.zip }}</span>
        <br>
        <br>
        <b>Payment Details</b>
        <br>
        <span>{{ item.billing.firstName }} {{ item.billing.lastName }}</span>
        <br>
        <span>*********1234</span>
        <br>
        <br>
        <div class="select">
          <select v-model="item.status">
            <option value="In Process">In Process</option>
            <option value="Ready to Ship">Ready to Ship</option>
            <option value="Shipped">Shipped</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <br>
        <br>
        <button class="button" style="margin-right: 15px" v-on:click="addOrder">
          <router-link to="/orders">Save</router-link>
        </button>
        <button class="button">
          <router-link to="/orders">Cancel</router-link>
        </button>
      </div>
    </div>
  </body>
  <Footer/>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
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
export default class OrderDetails extends Vue {
  @Prop()
  id: string | undefined;

  shippingItem: Shipping = {
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: ""
  }

  billingItem: Billing = {
    firstName: "",
    lastName: "",
    cardNumber: "",
    expiration: "",
    cvv: ""
  }

  item: Order = {
    orderNumber: 0,
    status: "",
    shippingYN: "",
    orderMonth: 0,
    orderDay: 0,
    orderYear: 0,
    shipping: this.shippingItem,
    billing: this.billingItem
  };

  mounted() {
    axios.get(APIConfig.buildUrl("/orderDetails/" + this.id)).then(response => {
      this.item = response.data.item;
    });
  }

  addOrder() {
    axios.put(APIConfig.buildUrl("/orderDetails/" + this.id), {
      ...this.item
    });
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
</style>
