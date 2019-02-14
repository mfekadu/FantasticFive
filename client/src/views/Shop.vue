<style scoped>

.products {
    text-align:center;
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
  <div class="home">
    <Header/>
    <h2 class="title is-2" style="text-align:center">Shop</h2>
    <div class="products">
        <div class="product">
            <div class="product-image">
                <img  src="https://cdn.shopify.com/s/files/1/0799/9645/products/16_-_Right_900x.jpg?v=1547158720" alt="[BIKE_NAME]">
            </div>
            <div class="name">Bike</div>
            <div class="description">Bike Description</div>
            <div class="price">$FREE.99</div>
            <button class="button">Add to Cart</button>
        </div>
        <div class="product">
            <div class="product-image">
                <img  src="https://cdn.shopify.com/s/files/1/0799/9645/products/16_-_Right_900x.jpg?v=1547158720" alt="[BIKE_NAME]">
            </div>
            <div class="name">Bike</div>
            <div class="description">Bike Description</div>
            <div class="price">$FREE.99</div>
            <button class="button">Add to Cart</button>
        </div>
        <div class="product">
            <div class="product-image">
                <img  src="https://cdn.shopify.com/s/files/1/0799/9645/products/16_-_Right_900x.jpg?v=1547158720" alt="[BIKE_NAME]">
            </div>
            <div class="name">Bike</div>
            <div class="description">Bike Description</div>
            <div class="price">$FREE.99</div>
            <button class="button">Add to Cart</button>
        </div>
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
export default class Shop extends Vue {}
</script>
