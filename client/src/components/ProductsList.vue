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
    <div class="products">
        <div class="product">
            <figure class="image is-128x128">
                <img src="https://bulma.io/images/placeholders/128x128.png">
            </figure>
            <div class="name">Bike</div>
            <div class="description">Bike Description</div>
            <div class="price">$FREE.99</div>
            <button>Add to Cart</button>
        </div>
        <div class="product">
            <figure class="image is-128x128">
                <img  src="https://cdn.shopify.com/s/files/1/0799/9645/products/16_-_Right_900x.jpg?v=1547158720" alt="[BIKE_NAME]">
            </figure>
            <div class="name">Bike</div>
            <div class="description">Bike Description</div>
            <div class="price">$FREE.99</div>
            <button>Add to Cart</button>
        </div>
        <div class="product">
            <figure class="image is-128x128">
                <img  src="https://cdn.shopify.com/s/files/1/0799/9645/products/16_-_Right_900x.jpg?v=1547158720" alt="[BIKE_NAME]">
            </figure>
            <div class="name">Bike</div>
            <div class="description">Bike Description</div>
            <div class="price">$FREE.99</div>
            <button>Add to Cart</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class ProductsList extends Vue {
    
}
</script>

<style scoped>

</style>
