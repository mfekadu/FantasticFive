<template>
  <div class="filters message">
    <div class="title message-header">Filters</div>

    <div class="filterList">
        <div class="brand filterChunk">
            <p class="title">Brand</p>
            <div v-for="(brand, index) in brands" v-bind:key="index">
                <label class="checkbox">
                  <input v-on:change="brandUpdate(brand)"
                  v-model="brand.status"
                  type="checkbox">
                    {{ " " + brand.value }}
                </label>
            </div>
        </div>

        <div class="category filterChunk">
            <p class="title">Category</p>
            <div v-for="(category, index) in categories" v-bind:key="index">
                <label class="checkbox">
                  <input v-on:change="categoryUpdate(category)"
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
                  <input v-on:change="priceUpdate(price)"
                         v-model="price.status"
                         type="checkbox">
                    {{ " " + price.value }}
                </label>
            </div>
        </div>

        <div class="storePickup filterChunk">
            <p class="title">Store Pickup</p>
            <div class="control">
                <label class="radio">
                    <input v-on:change="pickupUpdate(YES)" 
                            v-model="pickupChoice"
                            type="radio"
                            value=true
                            name="answer">
                    Yes
                </label>
                <label class="radio">
                    <input v-on:change="pickupUpdate(NO)" 
                            v-model="pickupChoice"
                            type="radio"
                            value=false
                            name="answer">
                    No
                </label>
                {{ pickupChoice }}
            </div>
        </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

// export interface iFilters {
//   checkedBrands: string[];
//   checkedCategories: string[];
//   checkedPrices: string[];
//   pickupChoice: string;
// };

import { iFilter, FT, YES_PICKUP, NO_PICKUP } from "@/models/filter.interface";

// interface iFilter {
//   name: string;
//   checked: boolean;
// }



@Component
export default class ProductFilters extends Vue {
  YES: iFilter = YES_PICKUP;
  NO: iFilter = NO_PICKUP;

  brands: iFilter[] = this.stringArrayToFilterArray(FT.br, [
    "Trek",
    "Diamondback",
    "Specialized"
  ]);
  categories: iFilter[] = this.stringArrayToFilterArray(FT.ca, [
    "Bikes",
    "Clothes",
    "Bike Parts"
  ]);
  prices: iFilter[] = this.stringArrayToFilterArray(FT.pr, [
    "under $50",
    "$51 - $100",
    "$101 - $200",
    "$201+"
  ]);
  checkedBrands: string[] = [];
  checkedCategories: string[] = [];
  checkedPrices: string[] = [];
  pickupChoice: string = "";

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

  brandUpdate(brand: iFilter) {
    this.$emit("brandUpdate", brand);
  }

  categoryUpdate(category: iFilter) {
    this.$emit("categoryUpdate", category);
  }

  priceUpdate(price: iFilter) {
    this.$emit("priceUpdate", price);
  }

  pickupUpdate(pickup: iFilter) {
    this.$emit("pickupUpdate", pickup);
  }

  picked() {
    console.log(this.pickupChoice);
  }

  mounted() {
    console.log(this.checkedBrands);
    console.log(this.checkedCategories);
    console.log(this.checkedPrices);
    console.log(this.pickupChoice);
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
</style>
