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
        <input class="input is-small" type="text" placeholder="First Name">
        <br>
        <input class="input is-small" type="text" placeholder="Last Name">
        <br>
        <input class="input is-small" type="text" placeholder="Address">
        <br>
        <input class="input is-small" type="text" placeholder="City">
        <br>
        <input class="input is-small" type="text" placeholder="ZIP Code">
        <br>
        <br>

        <h3 class="title is-3">Billing Info</h3>
        <input class="input is-small" type="text" placeholder="Card Number">
        <br>
        <input class="input is-small" style="width: 50%" type="text" placeholder="Expiration Date">
        <input class="input is-small" style="width: 50%" type="text" placeholder="CVV">
        <br>
        <input class="input is-small" type="text" placeholder="First Name">
        <br>
        <input class="input is-small" type="text" placeholder="Last Name">
        <br>
        <input class="input is-small" type="text" placeholder="Address">
        <br>
        <input class="input is-small" type="text" placeholder="City">
        <br>
        <input class="input is-small" type="text" placeholder="ZIP Code">
        <br>
        <br>
        <button class="button" style="margin-right: 15px">
          <router-link to="/cart">Back to Cart</router-link>
        </button>
        <button class="button">
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

@Component({
  components: {
    Footer
  }
})
export default class Checkout extends Vue {}
</script>

<style scoped>
</style>