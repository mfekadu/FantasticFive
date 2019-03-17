<template>
<div class="checkout">
  <body>
    <br>
    <h1 class="title is-1">Foxycle</h1>
    <div class="columns">
      <div class="column is-one-third">
        <h3 class="title is-3">Shipping Info</h3>
          <div class="checkbox">
            <label><input type="checkbox" v-model="this.checked" v-on:click="onCheck">Pick up in store</label>
          </div>
          <br>
          <div v-if="this.checked == false">
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
          </div>
          <div v-if="this.noShipping == true">
            <br>
            <p style="color:#FF0000">An Item In Your Cart Must Be Picked Up In Store, Therefore You Cannot Ship Your Order.</p>
            <br>
          </div>

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

      <div style="padding-left: 100px" v-if="cartNotEmpty()">
        <h3 class="title is-3">Order Summary</h3>
        <div class="scroller">
          <div class="card" v-for="(p, index) in this.$store.state.cart" v-bind:key="index">
            <ProductCard v-bind:product="p"
                      v-bind:hasOrderDetail="true"/>
          </div>
        </div>
        <div>
          <b>Total Price: ${{ this.total }}</b>
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
import { OrderProd } from '@/views/Status.vue';

@Component({
  components: {
    Footer,
    ProductCard
  }
})
export default class Checkout extends Vue {
  @Prop()
  id: string | undefined;

  checked: boolean = false;

  orderId: number = 0;

  total: number = 0;

  tester: number = 0;

  noShipping: boolean = false;

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
    shippingYN: true,
    orderMonth: 0,
    orderDay: 0,
    orderYear: 0,
    shipping: this.shippingItem,
    billing: this.billingItem
  };

  p: Product = {
    title: "",
    desc: "",
    stock: 0,
    price: 0,
    photoURL: "",
    saleYN: false,
    salesPrice: 0
  }

  op: orderProd = {
    id: 0,
    orderQuantity: 0,
    orderPrice: 0,
    orderNumber: 0,
    productId: 0
  }

  mounted() {
    this.setup();
  }

  onCheck() {
    if (this.noShipping == true) {
      this.checked = true;
      this.order.shippingYN = false;
    }
    else if (this.checked == false) {
      this.checked = true;
      this.order.shippingYN = false;
    }
    else {
      this.checked = false;
      this.order.shippingYN = true;
    }
  }

  setup() {
    for (let index in this.$store.state.cart) {
      let item = this.$store.state.cart[index];
      if (item.saleYN) {
        this.total = this.total + (item.salesPrice * item.cartQuantity);
      }
      else {
        this.total = this.total + (item.price * item.cartQuantity);
      }
      if (item.canShipYN == false) {
        this.noShipping = true;
        this.checked = true;
        this.onCheck();
      }
    }
  }

  addOrder() {
    const _that = this;
    axios
      .post(APIConfig.buildUrl("/checkout"), this.order)
      .then((res: AxiosResponse<Order>) => {
        _that.order.orderNumber = res.data.orderNumber;
        const orderID = res.data.orderNumber;
        for (let key in _that.$store.state.cart) {
          let temp: Product = {..._that.p};
          axios.post(
            APIConfig.buildUrl("/orderProduct/" + orderID),
            _that.$store.state.cart[key] // sends the iProduct at the key index of the cart
          )
          .then((fin: AxiosResponse<orderProd>) => {
            temp.title = _that.$store.state.cart[key].title;
            temp.desc = _that.$store.state.cart[key].desc;
            temp.stock = _that.$store.state.cart[key].stock - fin.data.orderQuantity;
            temp.price = _that.$store.state.cart[key].price;
            temp.photoURL = _that.$store.state.cart[key].photoURL;
            temp.saleYN = _that.$store.state.cart[key].saleYN;
            temp.salesPrice = _that.$store.state.cart[key].salesPrice;

            axios.put(
              APIConfig.buildUrl("/shop/" + fin.data.productId),
              {...temp}
            );
          });
        }
      });
  }

  cartNotEmpty(): boolean {
    return Object.keys(this.$store.state.cart).length > 0;
  }
}

export interface Product {
  title: string;
  desc: string;
  stock: number;
  price: number;
  photoURL: string;
  saleYN: boolean;
  salesPrice: number;
}

export interface orderProd {
  id: number;
  orderQuantity: number;
  orderPrice: number;
  orderNumber: number;
  productId: number;
}

export interface Order {
  orderNumber: number;
  status: string;
  shippingYN: boolean;
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
.scroller {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  width: 400px;
}

.card {
  display: inline-block;
  padding-right: 20px;
  padding-left: 20px;
}
</style>
