<template>
<div class="cart">
    <Header/>
  <body>
    <h3 class="title is-3" style="text-align: center">Cart</h3>
    <div class="row" v-for="(p, index) in this.$store.state.cart" v-bind:key="index">
      <div class="column">
        {{ " " + p.title }}
        <br>{{ p.price }}
        <br>Quantity: {{ p.quantity }}
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
import Header from "@/components/Header.vue";

@Component({
  components: {
    Footer,
    Header
  }
})
export default class Cart extends Vue {

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
