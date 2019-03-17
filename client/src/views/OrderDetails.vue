<template>
<div class="orderDetails">
  <AdminHeader/>
  <body>
    <h3 class="title" style="text-align: center">
      Order# {{ item.orderNumber }},
      Order Date: {{ item.orderMonth }}/{{ item.orderDay }}/{{ item.orderYear }}
    </h3>
    <div class="columns">
      <div class="scroller column is-6">
        <div class="card" v-for="(item, index) in this.prodList" v-bind:key="index">
          <ProductCard v-bind:product="item"
                     v-bind:hasOrderDetail="true"/>
        </div>
        <div style="padding-bottom: 75px; padding-top: 30px">
          <b>Total Price: ${{ this.total }}</b>
        </div>
      </div>
      <div class="column is-6">
        <b>Shipping Details</b>
        <br>
        <div v-if="item.shippingYN == true">
          <span>{{ item.shipping.firstName }} {{ item.shipping.lastName }}</span>
          <br>
          <span>{{ item.shipping.address1 }}, {{ item.shipping.address2 }}</span>
          <br>
          <span>{{ item.shipping.city }}, {{ item.shipping.state }}, {{ item.shipping.zip }}</span>
        </div>
        <div v-if="item.shippingYN == false">
          <br>
          <p style="color:#FF0000">Order Must Be Picked Up In Store</p>
          <br>
        </div>
        <br>
        <br>
        <b>Payment Details</b>
        <br>
        <span>{{ item.billing.firstName }} {{ item.billing.lastName }}</span>
        <br>
        <br>
        <span>{{ cNum }}</span>
        <br>
        <br>
        <div class="select" v-if="this.cancelled == false">
          <select v-model="item.status">
            <option value="In Process">In Process</option>
            <option value="Ready to Ship">Ready to Ship</option>
            <option value="Shipped">Shipped</option>
            <option value="Cancelled" v-if="this.$store.state.admin == true">Cancelled</option>
            <option value="Ready for Pickup">Ready for Pickup</option>
            <option value="Complete">Complete</option>
          </select>
          <br>
          <br>
          <button class="button" style="margin-right: 15px" v-on:click="addOrder">Save</button>
          <router-link class="button" to="/orders">Cancel</router-link>
        </div>
        <div v-else>
          <p style="color:#FF0000">Order Cancelled</p>
          <br>
          <br>
          <router-link class="button" to="/orders">Cancel</router-link>
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
import AdminHeader from "@/components/AdminHeader.vue";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";

import ProductCard from "@/components/ProductCard.vue";
import { iProduct } from "@/models/product.interface";

@Component({
  components: {
    Footer,
    AdminHeader,
    ProductCard
  }
})
export default class OrderDetails extends Vue {
  @Prop() id: string | undefined;

  cNum: string = "";
  
  p1: iProduct = {
    id: 0,
    title: "A Trek Bike",
    desc: "description",
    brand: "",
    categories: [""],
    stock: 3,
    cartQuantity: 0,
    price: 499,
    saleYN: false,
    salesPrice: 499,
    canShipYN: false,
    photoURL: "./logo.png"
  };

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
    billing: this.billingItem
  };

  prod: OrderProd = {
    id: 0,
    orderQuantity: 0,
    orderPrice: 0,
    orderNumber: 0,
    productId: 0
  }

  prodInfo: ProductInfo = {
    id: 0,
    title: "",
    desc: "",
    brand: "",
    category: "",
    quantity: 0,
    cartQuantity: 0,
    price: 0,
    saleYN: false,
    salesPrice: 0,
    canShipYN: false,
    photoURL: ""
  }

  orderProds: OrderProd[] = [];

  prodList: iProduct[] = [];

  total: number = 0;

  cancelled: boolean = false;

  mounted() {
    axios.get(APIConfig.buildUrl("/orderDetails/" + this.id)).then(response => {
      this.item = response.data.item;
      this.setCancelled();
      this.checkCardNum();
      this.getProductLink();
    });
  }

  checkCardNum() {
    if (this.item.billing.cardNumber.length < 4) {
      this.cNum = "94305" + this.item.billing.cardNumber; 
    }
    else {
      this.cNum = this.item.billing.cardNumber;
    }
    var num = this.cNum.length - 4;
    this.cNum = "************" + this.cNum.substring(num)
  }

  setCancelled() {
    if (this.item.status == "Cancelled") {
      this.cancelled = true;
    }
  }

  getProductInfo() {
    for (var data of this.orderProds) {
      let v = data.orderQuantity;
      this.total = this.total + data.orderPrice;
      axios.get(APIConfig.buildUrl("/productInfo/" + data.productId)).then(response => {
        let p: iProduct = response.data.item;
        p.cartQuantity = v;
        this.prodList.push(p);
      });
    }
  }

  getProductLink() {
    axios.get(APIConfig.buildUrl("/orderProduct/")).then((response: AxiosResponse) => {
      var resItems = response.data.orderProds;
      this.orderProds = resItems.filter(
        (prod: any) => prod.orderNumber == this.id
      );
      this.getProductInfo();
    });
  }

  addOrder() {
    axios
      .put(APIConfig.buildUrl("/orderDetails/" + this.id), {
        ...this.item
      })
      .then(res => {
        this.$router.push("/orders");
      });
  }
}

export interface ProductInfo {
  id: number;
  title: string;
  desc: string;
  brand: string;
  category: string;
  quantity: number;
  cartQuantity: number;
  price: number;
  saleYN: boolean;
  salesPrice: number;
  canShipYN: boolean;
  photoURL: string;
}

export interface OrderProd {
  id: number;
  orderQuantity: number;
  orderPrice: number;
  orderNumber: number;
  productId: number;
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

.center {
  text-align: center;
}
</style>
