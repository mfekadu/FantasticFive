<template>
<div class="status">
  <Header/>
  <body>
    <div class="columns">
      <div class="column">
        <h2 class="title is-2">Order Number: {{ item.orderNumber }}</h2>
        <h2 class="title is-2">Order Date: {{ item.orderMonth }}/{{ item.orderDay }}/{{ item.orderYear }}</h2>
        <h3 class="title is-3">Status: {{ item.status }}</h3>
        <div class="scroller">
          <div class="card" v-for="(item, index) in this.prodList" v-bind:key="index">
            <ProductCard v-bind:product="item"
                      v-bind:hasOrderDetail="true"/>
          </div>
        </div>
        <div style="padding-bottom: 75px; padding-top: 30px">
          <b>Total Price: ${{ this.total }}</b>
        </div>
      </div>
      <div class="column">
        <h3 class="title is-3">Shipping Details</h3>
        <div v-if="item.shippingYN == true">
          {{item.shipping.firstName}} {{ item.shipping.lastName }}
          <br>
          {{ item.shipping.address1 }}, {{ item.shipping.address2 }}
          <br>
          {{ item.shipping.city }}, {{ item.shipping.state }} {{ item.shipping.zip }}
        </div>
        <div v-if="item.shippingYN == false">
          <br>
          <p style="color:#FF0000">Your Order Must Be Picked Up In Store</p>
          <br>
        </div>
        <br>
        <br>
        <h3 class="title is-3">Payment Details</h3>{{ item.billing.firstName }} {{ item.billing.lastName }}
        <br>Card #: {{ cNum }}
        <br><br>
        <div style="color: red">Call (805) 555-5555 for any questions</div>
      </div>
    </div>
  </body>
  <Footer/>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";

import ProductCard from "@/components/ProductCard.vue";
import { iProduct } from "@/models/product.interface";

@Component({
  components: {
    Footer,
    Header,
    ProductCard
  }
})
export default class Status extends Vue {
  @Prop() 
  id: string | undefined;

  orderProds: OrderProd[] = [];

  prodList: iProduct[] = [];

  total: number = 0;

  cNum: string = "";

  prod: OrderProd = {
    id: 0,
    orderQuantity: 0,
    orderPrice: 0,
    orderNumber: 0,
    productId: 0
  }

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

  mounted() {
    axios.get(APIConfig.buildUrl("/orderDetails/" + this.id)).then(response => {
      this.item = response.data.item;
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
