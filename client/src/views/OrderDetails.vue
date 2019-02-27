<template>
<div class="orderDetails">
  <AdminHeader/>
  <body>
    <h3 class="title" style="text-align: center">Order #P7G640</h3>
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
        <span>John Smith</span>
        <br>
        <span>123 Street Ave.</span>
        <br>
        <span>San Luis Obispo, CA, 93405</span>
        <br>
        <br>
        <b>Payment Details</b>
        <br>
        <span>John Smith</span>
        <br>
        <span>*********1234</span>
        <br>
        <br>
        <div class="select">
          <select>
            <option>In Process</option>
            <option>Ready to Ship</option>
            <option>Shipped</option>
            <option>Cancelled</option>
          </select>
        </div>
        <br>
        <br>
        <button class="button" style="margin-right: 15px">
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
import { Component, Vue } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";
import AdminHeader from "@/components/AdminHeader.vue";

@Component({
  components: {
    Footer,
    AdminHeader
  }
})
export default class OrderDetails extends Vue {}
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
