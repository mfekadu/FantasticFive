<template>
  <div class="filters message">
    <div class="title message-header">Filters</div>

    <div class="filterList">
        <div class="brand filterChunk">
            <p class="title">Brand</p>
            <div v-for="(brand, index) in brands" v-bind:key="index">
                <label class="checkbox">
                  <input v-on:change="brandUpdate()"
                  v-model="brand.status"
                  type="checkbox">
                    {{ " " + brand.value }}
                    {{ "...status=" + brand.status }}
                </label>
            </div>
        </div>

        <div class="category filterChunk">
            <p class="title">Category</p>
            <div v-for="(category, index) in categories" v-bind:key="index">
                <label class="checkbox">
                  <input v-on:change="categoryUpdate()"
                         v-model="category.status"
                         type="checkbox">
                    {{ " " + category.value }}
                </label>
            </div>
        </div>

        <div class="price filterChunk">
            <p class="title">Price</p>
            <div v-for="(price, index) in prices" v-bind:key="index">
                <label class="checkbox">
                  <input v-on:change="priceUpdate()"
                         v-model="price.status"
                         type="checkbox">
                    {{ " " + price.value }}
                </label>
            </div>
        </div>

        <div class="storePickup filterChunk">
            <p class="title">Shipping</p>
            <div class="control">
                <label class="radio">
                    <input v-on:change="shipUpdate()" 
                            v-model="ship.status"
                            type="radio"
                            v-bind:value=true
                            name="answer">
                    Shipping Available
                </label>
                <label class="radio">
                    <input v-on:change="shipUpdate()" 
                            v-model="ship.status"
                            type="radio"
                            v-bind:value=false
                            name="answer">
                    In-Store Pickup
                </label>
                {{ ship.status }}
            </div>
        </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";


import { iFilter, iAllFilters, FT, PRICES, DEFAULT_SHIP, CAN_SHIP } from "@/models/filter.interface";

@Component
export default class ProductFilters extends Vue {
  YES: iFilter = DEFAULT_SHIP;
  NO: iFilter = CAN_SHIP;

  brands: iFilter[] = this.stringArrayToFilterArray(FT.b, [
    "Trek",
    "Diamondback",
    "Specialized"
  ]);
  categories: iFilter[] = this.stringArrayToFilterArray(FT.c, [
    "Bikes",
    "Clothes",
    "Bike Parts"
  ]);
  prices: iFilter[] = this.stringArrayToFilterArray(FT.p, [
    PRICES.low,
    PRICES.med,
    PRICES.high,
    PRICES.extra
  ]);
  ship: iFilter = DEFAULT_SHIP;

  // given an array of strings and the filter type, convert to iFilter[] array
  stringArrayToFilterArray(type: string, arr: string[]): iFilter[] {
    let filters: iFilter[] = [];
    arr.forEach(element => {
      const f: iFilter = { type: type, value: element, status: false };
      filters.push(f);
    });
    return filters;
  }

  // given a brand name and its checked state, update the list of checked brands
  filterUpdate(type: string, value: string, status: boolean) {
    this.$emit("filterUpdate", type, value, status);
  }

  brandUpdate() {
    const eventData : iAllFilters = {
      brands : this.brands, 
      categories : this.categories,
      prices : this.prices,
      shipping : this.ship
    }
    console.log("ProductFilters brandUpdate eventData:",eventData);
    this.$emit("brandUpdate", eventData);
  }

  categoryUpdate(category: iFilter) {
    // this.$emit("categoryUpdate", category);
    this.brandUpdate();
  }

  priceUpdate(price: iFilter) {
    // this.$emit("priceUpdate", price);
    this.brandUpdate();
  }

  shipUpdate(pickup: iFilter) {
    // this.$emit("shippingUpdate", pickup);
    this.brandUpdate();
  }

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

label {
  display:block; /* make it behave like a div */
  margin: 10px;
}
</style>
