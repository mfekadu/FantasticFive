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
            <button>Add to Cart</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

interface Product {
  title: string;
  desc: string;
  quantity: number;
  price: number;
  photoURL: string;
}

@Component
export default class ProductsList extends Vue {
  product1: Product = {
    title: "Bike",
    desc: "description",
    quantity: 5,
    price: 99,
    photoURL: "foo"
  };

  products: Product[] = [
    this.product1,
    this.product1,
    this.product1,
    this.product1,
    this.product1,
    this.product1,
    this.product1
  ];
}
</script>

<style scoped>
</style>
