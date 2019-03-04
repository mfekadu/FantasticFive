<template>
<div class="status">
  <Header/>
  <body>
    <div class="columns">
      <div class="column">
        <h2 class="title is-2">Order Number: {{ item.orderNumber }}</h2>
        <h2 class="title is-2">Order Date: {{ item.orderMonth }}/{{ item.orderDay }}/{{ item.orderYear }}</h2>
        <h3 class="title is-3">Status: {{ item.status }}</h3>

        Trek Bike *Picture*<br>
        $499<br>
        Quantity: 1<br><br>
        Bike Pump *Picture*<br>
        $29<br>
        Quantity: 1<br>
      </div>
      <div class="column">
        <h3 class="title is-3">Shipping Details</h3>{{item.shipping.firstName}} {{ item.shipping.lastName }}
        <br>{{ item.shipping.address1 }}, {{ item.shipping.address2 }}
        <br>{{ item.shipping.city }}, {{ item.shipping.state }} {{ item.shipping.zip }}
        <br>
        <br>
        <h3 class="title is-3">Payment Details</h3>{{ item.billing.firstName }} {{ item.billing.lastName }}
        <br>Card #: ****1234
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

@Component({
  components: {
    Footer,
    Header
  }
})
export default class Status extends Vue {
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