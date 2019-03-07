<template>
  <div class="filters message">
    <div class="title message-header">Filters</div>

    <div class="filterList">
        <div class="brand filterChunk">
            <p class="title">Brand</p>
            <div v-for="(brand, index) in brands" v-bind:key="index">
                <label class="checkbox">
                  <input v-on:change="filterUpdate('brand', brand.name, brand.checked)"
                  v-model="brand.checked"
                  type="checkbox">
                    {{ " " + brand.name }}
                </label>
            </div>
        </div>

        <div class="category filterChunk">
            <p class="title">Category</p>
            <div v-for="(category, index) in categories" v-bind:key="index">
                <label class="checkbox">
                  <input v-on:change="filterUpdate('category', category.name, category.checked)"
                         v-model="category.checked"
                         type="checkbox">
                    {{ " " + category.name }}
                </label>
            </div>
        </div>

        <div class="price filterChunk">
            <p class="title">Price</p>
            <div v-for="(price, index) in prices" v-bind:key="index">
                <label class="checkbox">
                  <input v-on:change="filterUpdate('price', price.name, price.checked)"
                         v-model="price.checked"
                         type="checkbox">
                    {{ " " + price.name }}
                </label>
            </div>
        </div>

        <div class="storePickup filterChunk">
            <p class="title">Store Pickup</p>
            <div class="control">
                <label class="radio"> <input v-on:change="filterUpdate('pickup', 'pickup', pickupChoice)" v-model="pickupChoice" type="radio" value=true name="answer"> Yes </label>
                <label class="radio"> <input v-on:change="filterUpdate('pickup', 'pickup', pickupChoice)" v-model="pickupChoice" type="radio" value=false name="answer"> No </label>
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

interface iFilter {
  name: string;
  checked: boolean;
}

@Component
export default class ProductFilters extends Vue {
  brands: iFilter[] = this.stringArrayToFilterArray([
    "Trek",
    "Diamondback",
    "Specialized"
  ]);
  categories: iFilter[] = this.stringArrayToFilterArray([
    "Bikes",
    "Clothes",
    "Bike Parts"
  ]);
  prices: iFilter[] = this.stringArrayToFilterArray([
    "under $50",
    "$51 - $100",
    "$101 - $200",
    "$201+"
  ]);
  checkedBrands: string[] = [];
  checkedCategories: string[] = [];
  checkedPrices: string[] = [];
  pickupChoice: string = "";

  // given an array of strings, convert to iFilter[] array
  stringArrayToFilterArray(arr: string[]): iFilter[] {
    let filters: iFilter[] = [];
    arr.forEach(element => {
      const f: iFilter = { name: element, checked: false };
      filters.push(f);
    });
    return filters;
  }

  // given a brand name and its checked state, update the list of checked brands
  filterUpdate(type: string, name: string, checked: boolean) {
    this.$emit("filterUpdate", type, name, checked);
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
