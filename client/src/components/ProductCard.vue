<style scoped>
.is-horizontal-center {
  justify-content: center;
}

.card {
  margin-top: 50px;
  margin-bottom: 50px;
  padding: 25px;
}
</style>


<template>
  <!-- this template uses the bulma "Card" and fills it with details of a product -->
  <!-- there is conditional logic for extra detail, but default is image+title+price -->
  <!-- see Shop.vue (default) and Cart.vue (extra) for examples of how to use this component -->
  <div class="card has-text-centered" v-bind:class="{'product': product}">
    <div class="card-image is-flex is-horizontal-center">
      <figure name="image" class="image is-128x128">
        <img v-bind:src="getPic128(product)" v-bind:alt="'image of ' + product.title">
      </figure>
    </div>
    <div class="card-content">
      <div name="title" class="title">{{ " " + product.title }}</div>
      <!-- vue conditional logic for when this component used in Cart.vue -->
      <div v-if="hasCartDetail">
        <div name="description" class="title is-5">{{ " " + product.desc }}</div>
        <div class="title is-5">{{ 'Quantity: ' + product.cartQuantity }}</div>
        <div></div>
      </div>
      <div name="price" class="title is-5">{{ "$" + product.price }}</div>
      <!-- vue conditional logic for when this component used in Cart.vue -->
      <div v-if="hasDeleteButton">
          <button class="button" v-on:click="deleteFromCart(product)">Delete From Cart</button>
      </div>
      <div v-else>
          <button class="button" v-on:click="addToCart(product)">Add To Cart</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { iProduct } from "@/models/product.interface";

@Component
export default class ProductCard extends Vue {
  @Prop({ default: null })
  product!: iProduct | null;

  @Prop({ type: Boolean, default: false })
  hasCartDetail!: boolean | null;

  @Prop({ type: Boolean, default: false })
  hasDeleteButton!: boolean | null;

  // function to talk to the store and remove a product
  deleteFromCart(product: iProduct) {
    this.$store.commit("deleteFromCart", product);
    // emit a "deleted" event that Cart can handle via v-on:deleted="func()"
    this.$emit("deleted");
  }

  // given an iProduct, get its photoURL, else return a placeholder
  getPic128(p: iProduct) {
    return p ? p.photoURL : "./128x128.png";
  }

  // given an iProduct, add it to cart
  addToCart(p: iProduct): void {
    // update the store using the addToCart mutator
    this.$store.commit("addToCart", p);
  }
}
</script>
