<template>
  <div class="filters message">
    <div class="title message-header">Filters</div>

    <div class="filterList">
        <div class="brand filterChunk">
            <p class="title">Brand</p>
            <label class="checkbox"> <input type="checkbox"> Trek </label><br>
            <label class="checkbox"> <input type="checkbox"> Diamondback </label><br>
            <label class="checkbox"> <input type="checkbox"> Specialized </label><br>
        </div>

        <div class="category filterChunk">
            <p class="title">Category</p>
            <label class="checkbox"> <input type="checkbox"> Bikes </label><br>
            <label class="checkbox"> <input type="checkbox"> Clothes </label><br>
            <label class="checkbox"> <input type="checkbox"> Bike Parts </label><br>
        </div>

        <div class="price filterChunk">
            <p class="title">Price</p>
            <label class="checkbox"> <input type="checkbox"> under $50 </label><br>
            <label class="checkbox"> <input type="checkbox"> $51 - $100 </label><br>
            <label class="checkbox"> <input type="checkbox"> $101 - $200 </label><br>
            <label class="checkbox"> <input type="checkbox"> $201+ </label><br>
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
export default class ProductFilters extends Vue { }
</script>

<style scoped>

.filters { }

.filterChunk {
    margin-bottom:25px;
    margin-top:25px;
    padding-left:15px;
}

</style>