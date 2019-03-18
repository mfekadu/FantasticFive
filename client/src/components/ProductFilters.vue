<template>
  <div class="filters message">
    <div class="title message-header">Filters</div>

    <div class="filterList">
        <!-- Brand -->
        <div class="brand filterChunk">
            <p class="title">Brand</p>
            <div v-for="(brand, index) in brands" v-bind:key="index">
                <label class="checkbox">
                  <input v-on:change="filterUpdate"
                  v-model="brand.status"
                  type="checkbox">
                    {{ " " + brand.value }}
                </label>
            </div>
        </div>
        <!-- Category -->
        <div class="category filterChunk">
            <p class="title">Category</p>
            <div v-for="(category, index) in categories" v-bind:key="index">
                <label class="checkbox">
                  <input v-on:change="filterUpdate"
                         v-model="category.status"
                         type="checkbox">
                    {{ " " + category.value }}
                </label>
            </div>
        </div>
        <!-- Price -->
        <div class="price filterChunk">
            <p class="title">Price</p>
            <div v-for="(price, index) in prices" v-bind:key="index">
                <label class="checkbox">
                  <input v-on:change="filterUpdate"
                         v-model="price.status"
                         type="checkbox">
                    {{ " " + price.value }}
                </label>
            </div>
        </div>
        <!-- Shipping -->
        <div class="shipping filterChunk">
            <p class="title">Shipping</p>
            <div class="control">
                <label class="radio">
                    <input v-on:change="filterUpdate" 
                            v-model="ship.status"
                            type="radio"
                            v-bind:value=true
                            name="answer">
                    Shipping Available
                </label>
                <label class="radio">
                    <input v-on:change="filterUpdate" 
                            v-model="ship.status"
                            type="radio"
                            v-bind:value=false
                            name="answer">
                    In-Store Pickup
                </label>
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/";

import {
  iFilter,
  iAllFilters,
  FT,
  PRICES,
  DEFAULT_SHIP,
  CAN_SHIP
} from "@/models/filter.interface";

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

  mounted() {
    this.refreshList();
  }

  refreshList() {
    axios
      .get( APIConfig.buildUrl("/brand") )
      .then( (response) =>  {
        const brandStrings = response.data.brands.map((each: any) => each.name);
        this.brands = this.stringArrayToFilterArray(FT.c, brandStrings);
      });
    axios
      .get( APIConfig.buildUrl("/category") )
      .then( (response) =>  {
        const catStrings = response.data.categories.map((each: any) => each.name);
        this.categories = this.stringArrayToFilterArray(FT.c, catStrings);
      });
  }

  // given an array of strings and the filter type, convert to iFilter[] array
  stringArrayToFilterArray(type: string, arr: string[]): iFilter[] {
    let filters: iFilter[] = [];
    arr.forEach(element => {
      const f: iFilter = { type: type, value: element, status: false };
      filters.push(f);
    });
    return filters;
  }

  filterUpdate() {
    const eventData: iAllFilters = {
      brands: this.brands,
      categories: this.categories,
      prices: this.prices,
      shipping: this.ship
    };
    this.$emit("filterUpdate", eventData);
  }
}
</script>

<style scoped>
.filterChunk {
  margin-bottom: 25px;
  margin-top: 25px;
  padding-left: 15px;
  padding-bottom: 20px;
}

label {
  display: block; /* make it behave like a div */
  margin: 10px;
}
</style>
