<template>
<div class="cart">
  <Header/>
  <div v-if="cartNotEmpty()" >
    <!-- ..... -->
    <h3 class="title is-3" style="text-align: center">Cart</h3>
    <div class="center checkout">
      <button class="button is-primary">
        <router-link to="/checkout" exact-active-class="is-active">
          Proceed to Checkout
        </router-link>
      </button>
    </div>
    <div class="columns productsBox">
      <div class="column" 
        v-for="(p, index) in this.$store.state.cart" 
        v-bind:key="index">
        <ProductCard v-bind:product="p"
                     v-bind:hasCartDetail="true"
                     v-bind:hasDeleteButton="true"
                     v-on:deleted="deleteHandler()"/>
      </div>
    </div>
    <!-- ..... -->
  </div>
  <div v-else style="text-align: center">
    <h3 class="title is-3">Cart is empty</h3>
    <h3 class="title is-3" >Please buy stuff!</h3>
    <h1 class="title is-1">💸💸💸</h1>
  </div>
  <Footer/>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";

import ProductCard from "@/components/ProductCard.vue";

import { iProduct } from "@/models/product.interface";

@Component({
  components: {
    Footer,
    Header,
    ProductCard
  }
})
export default class Cart extends Vue {
  // function to talk to cart is ask if it is empty, used by v-if directive
  cartNotEmpty(): boolean {
    return Object.keys(this.$store.state.cart).length > 0;
  }

  // handle the successful deletion event
  deleteHandler() {
    this.$forceUpdate();
  }
}
</script>

<style scoped>
.center {
  text-align: center;
}

.checkout {
  margin-top: 20px;
  margin-bottom: 20px;
}

.productsBox {
  margin-bottom: 25%;
}
</style>
