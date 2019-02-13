<template>
<div class="cart">
  <body>
    <h2 class="title is-3" style="text-align: center">Cart</h2>
    <div class="row">
      <div class="column">Trek Bike *Picture*
        <br>$499
        <br>Quantity: 1
        <br>
        <button class="button">Delete</button>
        <br>
      </div>
      <br>
      <div class="column">Bike Pump *Picture*
        <br>$29
        <br>Quantity: 1
        <br>
        <button class="button">Delete</button>
        <br>
      </div>
    </div>
    <br>
    <div class="center">
      <button class="button">
        <a href="checkout.html">Proceed to Checkout</a>
      </button>
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
export default class Cart extends Vue {}
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
