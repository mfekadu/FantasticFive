<style scoped>
.products {
  text-align: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.product {
  margin-top: 50px;
  margin-bottom: 50px;
  padding: 50px;
}

.product-image {
}
</style>

<template>
    <div class="products">
        <div class="product" v-for="(p, index) in products" v-bind:key="index">
            <figure class="image is-128x128">
                <img  src="https://cdn.shopify.com/s/files/1/0799/9645/products/16_-_Right_900x.jpg?v=1547158720" alt="[BIKE_NAME]">
            </figure>
            <div class="title">{{ " " + p.title }}</div>
            <div class="description">{{ " " + p.desc }}</div>
            <div class="price">{{ " $FREE." + p.price }}</div>
            <button class="button" v-on:click="addToCart(p.id)">Add to Cart</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { iProduct } from "@/models/product.interface";

@Component
export default class ProductsList extends Vue {
  p1: iProduct = {
    id: 0,
    title: "Trek Bike",
    desc: "description",
    brand: "",
    categories: [""],
    inventoryQuantity: 3,
    cartQuantity: 0,
    price: 499,
    saleYN: false,
    salesPrice: 499,
    canShipYN: false,
    photoURL: ""
  };

  p2: iProduct = {
    id: 1,
    title: "Bike Pump",
    desc: "description",
    brand: "",
    categories: [""],
    inventoryQuantity: 3,
    cartQuantity: 0,
    price: 99,
    saleYN: false,
    salesPrice: 499,
    canShipYN: false,
    photoURL: ""
  };

  cart: iProduct[] = [this.p1, this.p2];

  // given a product id (Primary Key), add the iProduct obj to cart
  addToCart(id: number): void {
    // log the id
    console.log(id);
    // get the iProduct that has id
    const p: iProduct = id === 0 ? this.p1 : this.p2;
    // update the store using the addToCart mutator
    this.$store.commit("addToCart", p);
  }

  products: iProduct[] = [this.p1, this.p2, this.p1, this.p2];
}
</script>

<style scoped>
</style>
