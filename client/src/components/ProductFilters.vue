<template>
  <div class="filters message">
    <div class="title message-header">Filters</div>

    <div class="filterList">
        <div class="brand filterChunk">
            <p class="title">Brand</p>
            <div v-for="(brand, index) in brands" v-bind:key="index">
                <label class="checkbox"> <input v-on:click="checked(brand)" v-model="brand.checked" type="checkbox">{{ " " + brand }}</label><br>
                Checked: {{ brand.checked }}
            </div>
        </div>

        <div class="category filterChunk">
            <p class="title">Category</p>
            <div v-for="(foo, index) in categories" v-bind:key="index">
                <label class="checkbox"> <input v-on:click="checked($event)" v-model="checkedCategories" type="checkbox">{{ " " + foo }}</label><br>
                {{ checkedCategories }}
            </div>
        </div>

        <div class="price filterChunk">
            <p class="title">Price</p>
            <div v-for="(foo, index) in prices" v-bind:key="index">
                <label class="checkbox"> <input v-on:click="checked($event)" v-model="checkedPrices" type="checkbox">{{ " " + foo }}</label><br>
                {{ checkedPrices }}
            </div>
        </div>

        <div class="storePickup filterChunk">
            <p class="title">Store Pickup</p>
            <div class="control">
                <label class="radio"> <input v-on:click="picked($event)" v-model="pickupChoice" type="radio" name="answer"> Yes </label>
                <label class="radio"> <input v-on:click="picked($event)" v-model="pickupChoice" type="radio" name="answer"> No </label>
                {{ pickupChoice }}
            </div>
        </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

export interface iFilters {
  checkedBrands: string[];
  checkedCategories: string[];
  checkedPrices: string[];
  pickupChoice: string;
}

@Component
export default class ProductFilters extends Vue {
  brands: any[] = [{name: "Trek"}, {name: "Diamondback"}, {name: "Specialized"}];
  categories: String[] = ["Bikes", "Clothes", "Bike Parts"];
  prices: String[] = ["under $50", "$51 - $100", "$101 - $200", "$201+"];
  checkedBrands: string[] = [];
  checkedCategories: string[] = [];
  checkedPrices: string[] = [];
  pickupChoice: string = "";

  checked(b: any) {
    console.log("these ones lag behind:")
    console.log("the brand", b, b.checked);
    let foo = this.brands.map((b) => ({...b}));
    console.log("brands", foo, ...foo);

    console.log("these ones do not:")
    let bar = this.brands.filter((b) => b.checked);
    console.log(bar, ...bar);
    this.$nextTick(() => {
      let baz = this.brands.filter((b) => b.checked);
      console.log(baz, ...baz);
      baz.forEach((observer,index,arr)=>{console.log(`${observer.name} is ${observer.checked}`)});
    })
  }

  picked(e: any) {
    console.log(e);
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
