<style scoped>
.is-horizontal-center {
  justify-content: center;
}

.card {
  margin-top: 50px;
  margin-bottom: 50px;
  padding: 25px;
}

.image {
  margin-bottom: 30px;
}
</style>


<template>
  <!-- this template uses the bulma "Card" and fills it with details of a product -->
  <!-- there is conditional logic for extra detail, but default is image+title+price -->
  <!-- see Shop.vue (default) and Cart.vue (extra) for examples of how to use this component -->
  <div class="card has-text-centered" v-bind:class="{'product': product}">
    <div class="card-image is-flex is-horizontal-center">
      <div v-if="!hasAdminButtons">
        <router-link :to="{path: '/productview/'+ product.id}" name="title" class="title">
          <figure name="image" class="image is-128x128">
            <img v-bind:src="getPic128(product)" v-bind:alt="'image of ' + product.title">
          </figure>
        </router-link>
      </div>
      <div v-else-if="hasAdminButtons">
          <figure name="image" class="image is-128x128">
            <img v-bind:src="getPic128(product)" v-bind:alt="'image of ' + product.title">
          </figure>
      </div>
    </div>
    <div class="card-content">
      <div v-if="!hasAdminButtons" style="margin-bottom:20px">
        <router-link :to="{path: '/productview/'+ product.id}" name="title" class="title">
          <a class="button is-text is-large">{{ " " + product.title }}</a>
        </router-link>
      </div>
      <div v-else-if="hasAdminButtons" style="margin-bottom:20px">
        <div name="title" class="title">{{ " " + product.title }}</div>
      </div>
      <!-- vue conditional logic for when this component used in Cart.vue -->
      <div v-if="hasCartDetail">
        <div name="description" class="title is-5">{{ " " + product.desc }}</div>
        <div class="title is-5">{{ 'Quantity: ' + product.cartQuantity }}</div>
        <div></div>
      </div>
      <div v-else-if="hasOrderDetail">
        <div class="title is-5">{{ 'Quantity: ' + product.cartQuantity }}</div>
        <div></div>
      </div>
      <div name="price" class="title is-5">{{ " $" + product.price }}</div>
      <!-- vue conditional logic for when this component used in Cart.vue -->
      <div v-if="hasDeleteButton">
        <button class="button" v-on:click="deleteFromCart(product)">Delete From Cart</button>
      </div>
      <div v-else-if="hasAdminButtons">
        <div name="stock" class="title is-5">{{ " Inventory: " + product.stock }}</div>
        <router-link class="button" :to="{path: '/itemedit/'+ product.id}">Edit</router-link>
        <button class="button" v-on:click="deleteProduct(product)" style="margin-left: 5px">Delete</button>
      </div>
      <div v-else-if="hasAddButton">
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
  hasOrderDetail!: boolean | null;

  @Prop({ type: Boolean, default: false })
  hasDeleteButton!: boolean | null;

  @Prop({ type: Boolean, default: false })
  hasAddButton!: boolean | null;

  @Prop({ type: Boolean, default: false })
  hasAdminButtons!: boolean | null;

  // funciton to handle the admin deleting a product
  deleteProduct(product: iProduct) {
    console.log("productCard...", product);
    this.$emit("deleteProduct", product);
  }

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
