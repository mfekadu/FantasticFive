<template>
<div class="cart">
  <body>
    <h3 class="title is-3" style="text-align: center">Cart</h3>
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
        <router-link to="/checkout" exact-active-class="is-active">Proceed to Checkout</router-link>
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
