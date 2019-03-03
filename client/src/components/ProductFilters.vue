<template>
  <div class="filters message">
    <div class="title message-header">Filters</div>

    <div class="filterList">
        <div class="brand filterChunk">
            <p class="title">Brand</p>
            <div v-for="(foo, index) in brands" v-bind:key="index">
                <label class="checkbox"> <input type="checkbox">{{ " " + foo }}</label><br>
            </div>
        </div>

        <div class="category filterChunk">
            <p class="title">Category</p>
            <div v-for="(foo, index) in categories" v-bind:key="index">
                <label class="checkbox"> <input type="checkbox">{{ " " + foo }}</label><br>
            </div>
        </div>

        <div class="price filterChunk">
            <p class="title">Price</p>
            <div v-for="(foo, index) in prices" v-bind:key="index">
                <label class="checkbox"> <input type="checkbox">{{ " " + foo }}</label><br>
            </div>
        </div>

        <div class="storePickup filterChunk">
            <p class="title">Store Pickup</p>
            <div class="control">
                <label class="radio"> <input type="radio" name="answer"> Yes </label>
                <label class="radio"> <input type="radio" name="answer"> No </label>
            </div>
        </div>

    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class ProductFilters extends Vue {
  brands: String[] = ["Trek", "Diamondback", "Specialized"];
  categories: String[] = ["Bikes", "Clothes", "Bike Parts"];
  prices: String[] = ["under $50", "$51 - $100", "$101 - $200", "$201+"];
}
</script>

<style scoped>
.filters {
}

.filterChunk {
  margin-bottom: 25px;
  margin-top: 25px;
  padding-left: 15px;
  padding-bottom: 20px;
}
</style>
