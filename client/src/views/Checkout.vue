<template>
<div class="checkout">
  <body>
    <br>
    <h1 class="title is-1">Foxycle</h1>
    <div class="columns">
      <div class="column is-one-third">
        <h3 class="title is-3">Shipping Info</h3>
        <input class="checkbox" type="checkbox"> Pick up in store
        <br>
        <input class="input is-small" type="text" placeholder="First Name" v-model="order.firstShip">
        <br>
        <input class="input is-small" type="text" placeholder="Last Name" v-model="order.lastShip">
        <br>
        <input class="input is-small" type="text" placeholder="Address 1" v-model="order.address1">
        <br>
        <input class="input is-small" type="text" placeholder="Address 2" v-model="order.address2">
        <br>
        <input class="input is-small" type="text" placeholder="City" v-model="order.city">
        <br>
        <input class="input is-small" type="text" placeholder="State" v-model="order.state">
        <br>
        <input class="input is-small" type="text" placeholder="ZIP Code" v-model="order.zip">
        <br>
        <br>

        <h3 class="title is-3">Billing Info</h3>
        <input class="input is-small" type="text" placeholder="First Name" v-model="order.firstBill">
        <br>
        <input class="input is-small" type="text" placeholder="Last Name" v-model="order.lastBill">
        <br>
        <input class="input is-small" type="text" placeholder="Card Number" v-model="order.cardNumber">
        <br>
        <input class="input is-small" style="width: 50%" type="text" placeholder="Expiration Date" v-model="order.expiration">
        <input class="input is-small" style="width: 50%" type="text" placeholder="CVV" v-model="order.cvv">
        <br>
        <!-- <input class="input is-small" type="text" placeholder="Address">
        <br>
        <input class="input is-small" type="text" placeholder="City">
        <br>
        <input class="input is-small" type="text" placeholder="ZIP Code">
        <br> -->
        <br>
        <button class="button" style="margin-right: 15px">
          <router-link to="/cart">Back to Cart</router-link>
        </button>
        <button class="button" v-on:click="addOrder">
          <router-link to="/confirmation">Confirm Purchase</router-link>
        </button>
      </div>
      <div class="column">
        <h3 class="title is-3">Order Summary</h3>Trek Bike *Picture*
        <br>$499
        <br>Quantity: 1
        <br>
        <br>Bike Pump *Picture*
        <br>$29
        <br>Quantity: 1
        <br>
      </div>
    </div>
  </body>
  <Footer/>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";

@Component({
  components: {
    Footer
  }
})
export default class Checkout extends Vue {
  order: OrderForm = {
    status: 1,
    shippingYN: true,
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

  addOrder() {
    axios.post(APIConfig.buildUrl("/checkout"), {
      ...this.order
    });
  }
}

export interface OrderForm {
  status: number;
  shippingYN: boolean;
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
</style>