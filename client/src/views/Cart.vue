<template>
<div class="cart">
    <Header/>
  <div v-if="cartNotEmpty()" >
    <h3 class="title is-3" style="text-align: center">Cart</h3>
    <div class="row" 
          v-for="(p, index) in this.$store.state.cart" 
          v-bind:key="index">
      <div class="column">
        {{ " " + p.title }}
        <br>{{ p.price }}
        <br>Quantity: {{ p.cartQuantity }}
        <br>
        <button class="button">Delete</button>
        <br>
      </div>
    </div>
    <div class="center">
      <button class="button">
        <router-link to="/checkout" exact-active-class="is-active">Proceed to Checkout</router-link>
      </button>
    </div>
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

@Component({
  components: {
    Footer,
    Header
  }
})
export default class Cart extends Vue {
  // function to talk to cart is ask if it is empty, used by v-if directive
  // return boolean
  cartNotEmpty(): boolean {
    return Object.keys(this.$store.state.cart).length > 0;
  }

  created() {
    // this log should show the same data as in Home.Vue (with duplicate values)
    // if user comes to cart from Home, not if they come from anywhere else
    // and that should prove the concept of shared state
    // so that concept can just be tied to a button!
    console.log(this.$store.state.cart);
  }
}
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
