<style scoped>
.products {
  text-align: center;
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

/* unset the Bulma styles for notification */
/* keep the background-color tho, that is useful */
.notification {
  padding: unset;
}

#toast {
  visibility: hidden;
  max-width: 50px;
  height: 50px;
  /*margin-left: -125px;*/
  margin: auto;
  /* comment out for use with Bulma .notification .is-primary .is-danger */
  /* background-color: #333; */
  /* color: #fff; */
  text-align: center;
  border-radius: 2px;

  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 70px;
  font-size: 17px;
  white-space: nowrap;
}
#toast #img {
  width: 50px;
  height: 50px;

  float: left;

  padding-top: 16px;
  padding-bottom: 16px;

  box-sizing: border-box;

  background-color: #111;
  color: #fff;
}
#toast #desc {
  color: #fff;

  padding: 16px;

  overflow: hidden;
  white-space: nowrap;
}

#toast.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, expand 0.5s 0.5s, stay 3s 1s, shrink 0.5s 2s,
    fadeout 0.5s 2.5s;
  animation: fadein 0.5s, expand 0.5s 0.5s, stay 3s 1s, shrink 0.5s 4s,
    fadeout 0.5s 4.5s;
}

@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@-webkit-keyframes expand {
  from {
    min-width: 50px;
  }
  to {
    min-width: 350px;
  }
}

@keyframes expand {
  from {
    min-width: 50px;
  }
  to {
    min-width: 350px;
  }
}
@-webkit-keyframes stay {
  from {
    min-width: 350px;
  }
  to {
    min-width: 350px;
  }
}

@keyframes stay {
  from {
    min-width: 350px;
  }
  to {
    min-width: 350px;
  }
}
@-webkit-keyframes shrink {
  from {
    min-width: 350px;
  }
  to {
    min-width: 50px;
  }
}

@keyframes shrink {
  from {
    min-width: 350px;
  }
  to {
    min-width: 50px;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 60px;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 60px;
    opacity: 0;
  }
}
</style>

<template>
  <div class="inventory">
    <AdminHeader/>
    <div id="toast" class="notification is-primary">
      <div id="img">
        <font-awesome-icon icon="cart-plus"/>
      </div>
      <div id="desc">Item Added!</div>
    </div>
    <h2 class="title is-2" style="text-align:center">Inventory</h2>
    <div style="text-align:center">
      <button class="button" style="margin-right: 5px">Add Item</button>
      <button class="button" style="margin-right: 5px">Add Brand</button>
      <button class="button">Add Category</button>
    </div>
    <!-- the Shop -->
    <div class="columns productsContainer">
      <!-- the Filters -->
      <div class="column filterColumn is-one-fifth">
        <ProductFilters v-on:filterUpdate="filterUpdate"/>
      </div>
      <!-- the Products -->
      <div class="column outerProductsContainer">
        <div class="columns innerProductsContainer">
          <div class="column productColumn" id="productsColumn1">
            <ProductsList v-bind:products="threeChunkProducts[0]" v-bind:hasAdmin="true"/>
          </div>
          <div class="column productColumn" id="productsColumn2">
            <ProductsList v-bind:products="threeChunkProducts[1]" v-bind:hasAdmin="true"/>
          </div>
          <div class="column productColumn" id="productsColumn3">
            <ProductsList v-bind:products="threeChunkProducts[2]" v-bind:hasAdmin="true"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AdminHeader from "@/components/AdminHeader.vue";
import ProductsList from "@/components/ProductsList.vue";
import ProductFilters from "@/components/ProductFilters.vue";
import { iProduct, iFilter, iAllFilters, FT, DEFAULT_SHIP } from "../models/";
import axios, { AxiosResponse } from "axios";
import { APIConfig, union, intersection } from "../utils/";

import { MOCK_PRODUCTS } from "../../tests/mock_data/product.data";

// define the Cond predicate type
type Cond = (product: iProduct, filter: iFilter) => boolean;

@Component({
  components: {
    AdminHeader,
    ProductsList,
    ProductFilters
  }
})
export default class Shop extends Vue {
  products: iProduct[] = [...MOCK_PRODUCTS];
  threeChunkProducts: iProduct[] = [];

  mounted() {
    this.refreshList();
  }

  // safely update the data bound to the template without messing with the this.products array
  updateView(products: iProduct[]) {
    this.threeChunkProducts = this.splitArrayInto(products, 3);
  }

  refreshList() {
    axios
      .get(APIConfig.buildUrl("/shop"))

      .then(response => {
        let dbProducts = response.data.productArray;

        // put the data in the thing
        dbProducts.forEach(
          (prod: any): void => {
            let p: iProduct = { ...prod };
            // converts a Database Product entity into an iProduct
            p.cartQuantity = 0;
            this.products.push(p);
          }
        );

        // update the view
        this.updateView(this.products);
      })
      .catch(reason => {
        this.filterUpdate(this.givenFilters);
      });
  }

  givenFilters: iAllFilters = {
    brands: [],
    categories: [],
    prices: [],
    shipping: DEFAULT_SHIP
  };

  // given products array, an iFilter array, and the Cond predicate
  // outputs the products that have match the condition
  // if no filtering occurs then the result is null
  // otherwise an array (empty or otherwise) is the filtered result
  filterByArray(
    products: iProduct[],
    filters: iFilter[],
    cond: Cond
  ): iProduct[] | null {
    let result: iProduct[] = [];
    // set to true if a checkbox / radio status is true
    let didFilter: boolean = false;
    for (const f of filters) {
      // if filtering is desired
      if (f.status) {
        didFilter = true;
        let c = (p: iProduct) => cond(p, f);
        let temp = products.filter(c);
        result = result.union(temp);
      }
    }
    return didFilter ? result : null;
  }

  // given the status of all of the filter options
  // output a filtered array of products based on the filter data
  // also updates the ProductList
  filterUpdate(data: iAllFilters): iProduct[] {
    // update local variable for correctly filtering after `mounted`
    this.givenFilters = data;
    // get all the products
    let products: iProduct[] = this.products;
    // these arrays hold the corresponding filtered products
    // or are null to signify no filtering occurred
    let filteredByBrand: iProduct[] | null = null;
    let filteredByPrice: iProduct[] | null = null;
    let filteredByCategory: iProduct[] | null = null;
    let filteredByShipping: iProduct[] | null = null;
    // this last array will be the intersection of the above arrays
    let finalFilter: iProduct[] = this.products;

    // cond is a helper lambda function for filtering
    let cond: Cond;

    cond = (product, brandFilter) => product.brand === brandFilter.value;
    filteredByBrand = this.filterByArray(products, data.brands, cond);

    cond = (product, priceFilter) => {
      // "$0 - $50" --> ['0', '50']
      // "$201+" --> ['201']
      const tuple: any[] = priceFilter.value
        .replace(new RegExp("\\$|\\+|\\-", "g"), "")
        .split(/\s+/);
      const min = parseInt(tuple[0]);
      const max = tuple[1] ? parseInt(tuple[1]) : Number.MAX_SAFE_INTEGER;
      return product.price >= min && product.price <= max;
    };
    filteredByPrice = this.filterByArray(products, data.prices, cond);

    cond = (product, catFilter) =>
      product.categories.indexOf(catFilter.value) >= 0;
    filteredByCategory = this.filterByArray(products, data.categories, cond);

    let newCond = (p: iProduct) => p.canShipYN === data.shipping.status;
    filteredByShipping = data.shipping.status ? products.filter(newCond) : null;

    if (filteredByBrand) {
      finalFilter = finalFilter.intersection(filteredByBrand);
    }
    if (filteredByCategory) {
      finalFilter = finalFilter.intersection(filteredByCategory);
    }
    if (filteredByPrice) {
      finalFilter = finalFilter.intersection(filteredByPrice);
    }
    if (filteredByShipping) {
      finalFilter = finalFilter.intersection(filteredByShipping);
    }

    this.updateView(finalFilter);
    return finalFilter;
  }

  // given an array and a chunk, split the array into chunks with row-major ordering
  // given arr=[1,2,3,4], chunk=2 -> expect [[1,3],[2,4]]
  // given arr=[1,2,3,4], chunk=2 -> do NOT expect [[1,2],[3,4]]
  splitArrayInto = (arr: Array<any>, chunk: number): Array<any> => {
    let i;
    let j;
    let temp = [];
    for (let col = 0; col < chunk; col++) {
      let colElements = [];
      for (let row = col; row < arr.length; row += chunk) {
        colElements.push(arr[row]);
      }
      temp.push(colElements);
    }
    return temp;
  };
}
</script>
