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
        <input
          class="input is-small"
          type="text"
          placeholder="First Name"
          v-model="shippingItem.firstName"
        >
        <br>
        <input
          class="input is-small"
          type="text"
          placeholder="Last Name"
          v-model="shippingItem.lastName"
        >
        <br>
        <input
          class="input is-small"
          type="text"
          placeholder="Address 1"
          v-model="shippingItem.address1"
        >
        <br>
        <input
          class="input is-small"
          type="text"
          placeholder="Address 2"
          v-model="shippingItem.address2"
        >
        <br>
        <input class="input is-small" type="text" placeholder="City" v-model="shippingItem.city">
        <br>
        <input class="input is-small" type="text" placeholder="State" v-model="shippingItem.state">
        <br>
        <input class="input is-small" type="text" placeholder="ZIP Code" v-model="shippingItem.zip">
        <br>
        <br>

        <h3 class="title is-3">Billing Info</h3>
        <input
          class="input is-small"
          type="text"
          placeholder="First Name"
          v-model="billingItem.firstName"
        >
        <br>
        <input
          class="input is-small"
          type="text"
          placeholder="Last Name"
          v-model="billingItem.lastName"
        >
        <br>
        <input
          class="input is-small"
          type="text"
          placeholder="Card Number"
          v-model="billingItem.cardNumber"
        >
        <br>
        <input
          class="input is-small"
          style="width: 50%"
          type="text"
          placeholder="Expiration Date"
          v-model="billingItem.expiration"
        >
        <input
          class="input is-small"
          style="width: 50%"
          type="text"
          placeholder="CVV"
          v-model="billingItem.cvv"
        >
        <br>
        <br>
        <button class="button" style="margin-right: 15px">
          <router-link to="/cart">Back to Cart</router-link>
        </button>
        <button class="button" v-on:click="addOrder">
          <router-link to="/confirmation">Confirm Purchase</router-link>
        </button>
      </div>

      <div v-if="cartNotEmpty()">
        <h3 class="title is-3">Order Summary</h3>
        <div class="column" v-for="(p, index) in this.$store.state.cart" v-bind:key="index">
          <!-- <ProductCard v-bind:product="p"
            v-bind:hasCartDetail="true"
            v-bind:hasDeleteButton="true"
          v-on:deleted="deleteHandler()"/>-->
          <div>
            <p>{{ p.title }}</p>
            <p>Image Here</p>
            <!-- <img src='{{ p.photoURL }}'/> -->
            <br>
            <p>${{ p.price }}</p>
            <br>
            <p>Quantity: {{ p.cartQuantity }}</p>
            <br>
            <p>-----------------------------------------</p>
          </div>
        </div>
      </div>
    </div>
  </body>
  <Footer/>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";
import ProductCard from "@/components/ProductCard.vue";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { iProduct } from "@/models/product.interface";

@Component({
  components: {
    Footer,
    ProductCard
  }
})
export default class Checkout extends Vue {
  @Prop()
  id: string | undefined;

  orderId: number = 0;

  prods: iProduct[] = this.$store.state.cart;

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

  order: Order = {
    orderNumber: 0,
    status: "In Process",
    shippingYN: "",
    orderMonth: 0,
    orderDay: 0,
    orderYear: 0,
    shipping: this.shippingItem,
    billing: this.billingItem
  };

  addOrder() {
    const _that = this;
    axios
      .post(APIConfig.buildUrl("/checkout"), this.order)
      .then((res: AxiosResponse<Order>) => {
        _that.order.orderNumber = res.data.orderNumber;
        const orderID = res.data.orderNumber;
        for (var key in _that.$store.state.cart) {
          axios.post(
            APIConfig.buildUrl("/orderProduct/" + orderID),
            _that.$store.state.cart[key] // sends the iProduct at the key index of the cart
          );
        }
      });
  }

  cartNotEmpty(): boolean {
    return Object.keys(this.$store.state.cart).length > 0;
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
</style>
