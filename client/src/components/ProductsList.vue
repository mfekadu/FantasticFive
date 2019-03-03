<style scoped>
</style>

<template>
  <div>
    <div v-for="(p, index) in products" v-bind:key="index">
      <ProductCard v-bind:product="p"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ProductCard from "@/components/ProductCard.vue";
import { iProduct } from "@/models/product.interface";

@Component({
  components: { ProductCard } 
})
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
    photoURL: "./logo.png"
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
    photoURL: "./128x128.png"
  };

  p3: iProduct = {
    id: 2,
    title: "foo",
    desc: "description",
    brand: "",
    categories: [""],
    inventoryQuantity: 3,
    cartQuantity: 0,
    price: 99,
    saleYN: false,
    salesPrice: 499,
    canShipYN: false,
    photoURL: "./128x128.png"
  };

  p4: iProduct = {
    id: 3,
    title: "bar",
    desc: "description",
    brand: "",
    categories: [""],
    inventoryQuantity: 3,
    cartQuantity: 0,
    price: 99,
    saleYN: false,
    salesPrice: 499,
    canShipYN: false,
    photoURL: "./128x128.png"
  };

  p5: iProduct = {
    id: 4,
    title: "baz",
    desc: "description",
    brand: "",
    categories: [""],
    inventoryQuantity: 3,
    cartQuantity: 0,
    price: 99,
    saleYN: false,
    salesPrice: 499,
    canShipYN: false,
    photoURL: "./128x128.png"
  };

  cart: iProduct[] = [this.p1, this.p2, this.p3];

  products: iProduct[] = [this.p1, this.p2, this.p3, this.p4, this.p5];
}
</script>

<style scoped>
</style>
