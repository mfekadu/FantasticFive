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
  <div class="shop">
    <Header/>
    <div id="toast" class="notification is-primary">
      <div id="img">
        <font-awesome-icon icon="cart-plus"/>
      </div>
      <div id="desc">Item Added!</div>
    </div>
    <h2 class="title is-2" style="text-align:center">Shop</h2>

    <div class="columns productsContainer">
      <div class="column filterColumn is-one-fifth">
        <ProductFilters v-on:filterUpdate="filterUpdate"/>
      </div>
      <div class="column outerProductsContainer">
        <div class="columns innerProductsContainer">
          <div class="column productColumn" id="productsColumn1">
            <ProductsList v-bind:products="threeChunkProducts[0]"/>
          </div>
          <div class="column productColumn" id="productsColumn2">
            <ProductsList v-bind:products="threeChunkProducts[1]"/>
          </div>
          <div class="column productColumn" id="productsColumn3">
            <ProductsList v-bind:products="threeChunkProducts[2]"/>
          </div>
        </div>
      </div>
    </div>

    <Footer/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import ProductsList from "@/components/ProductsList.vue";
import ProductFilters from "@/components/ProductFilters.vue";
import { iProduct } from "@/models/product.interface";

import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";

interface iFilter {
  type: string;    // brand, category, price, picked
  value: string;   // a value corresponding to a key in an iProduct object
  status: boolean; // to include or not include in filtered array
}

@Component({
  components: {
    Footer,
    Header,
    ProductsList,
    ProductFilters
  }
})
export default class Shop extends Vue {
  p1: iProduct = {
    id: 0,
    title: "A Trek Bike",
    desc: "description",
    brand: "Trek",
    categories: [""],
    inventoryQuantity: 3,
    cartQuantity: 0,
    price: 499,
    saleYN: false,
    salesPrice: 499,
    canShipYN: true,
    photoURL: "./logo.png"
  };

  p2: iProduct = {
    id: 1,
    title: "B Bike Pump",
    desc: "description",
    brand: "Diamondback",
    categories: [""],
    inventoryQuantity: 3,
    cartQuantity: 0,
    price: 99,
    saleYN: false,
    salesPrice: 499,
    canShipYN: false,
    photoURL: "./128x128.png"
  };

  p3: iProduct = {
    id: 2,
    title: "C foo",
    desc: "description",
    brand: "",
    categories: [""],
    inventoryQuantity: 3,
    cartQuantity: 0,
    price: 99,
    saleYN: false,
    salesPrice: 499,
    canShipYN: false,
    photoURL: "./128x128.png"
  };

  p4: iProduct = {
    id: 3,
    title: "D bar",
    desc: "description",
    brand: "",
    categories: [""],
    inventoryQuantity: 3,
    cartQuantity: 0,
    price: 99,
    saleYN: false,
    salesPrice: 499,
    canShipYN: false,
    photoURL: "./128x128.png"
  };

  p5: iProduct = {
    id: 4,
    title: "E baz",
    desc: "description",
    brand: "",
    categories: [""],
    inventoryQuantity: 3,
    cartQuantity: 0,
    price: 99,
    saleYN: false,
    salesPrice: 499,
    canShipYN: false,
    photoURL: "./128x128.png"
  };

  products: iProduct[] = [
    this.p1,
    this.p2,
    this.p3
  ];
  threeChunkProducts: iProduct[] = [];

  mounted() {
    this.refreshList();
  }

  // safely update the data bound to the template without messing with the this.products array
  updateView(products: iProduct[]) {
    this.threeChunkProducts = this.splitArrayInto(products, 3);
  }

  refreshList() {
    axios.get(APIConfig.buildUrl("/shop")).then(response => {
      let dbProducts = response.data.productArray;

      // put the data in the thing
      dbProducts.forEach((prod : any) : void => {
         let p: iProduct = {...prod};
         // converts a Database Product entity into an iProduct
         p.cartQuantity = 0;
         p.inventoryQuantity = prod.quantity;
         this.products.push(p);
      });

      // update the view
      this.updateView(this.products);
      console.log(this.products);
    });
  }

  // filters is a map of the filter type to an iFilter object
  filters : {[type: string] : iFilter} = {};

  // given the type of filter, the value to filter by, and the status of include or not include in the filtered array
  // output a filtered iProduct array starting from this.products
  // optionally provide an array as a starting point
  doFilter(type: string, value: string, status: boolean, arr: iProduct[] | undefined) : iProduct[] {
    let filteredProducts: iProduct[] = (arr) ? arr : this.products;

    // cond is a helper lambda function for filtering
    let cond: (arg0: iProduct) => void;

    switch (type) {
      case "brand":
        console.log("dofilter",type,value,status);
        // filter products if status is true
        filteredProducts = status ? this.products.filter(x => x.brand === value) : filteredProducts;
        break;
      case "price":
        console.log("dofilter",type,value,status);
        switch (value) {
          case "under $50":
            filteredProducts = status ? this.products.filter((x) => x['price'] <= 50) : filteredProducts;
            break;
          case "$51 - $100":
            cond = (x) => { (x['price'] >= 51 || x['price'] <= 100) };
            filteredProducts = status ? this.products.filter((x) => cond(x)) : filteredProducts;
            break;
          case "$101 - $200":
            cond = (x) => { (x['price'] >= 101 || x['price'] <= 200) };
            filteredProducts = status ? this.products.filter((x) => cond(x)) : filteredProducts;
            break;
          case "$201+":
            filteredProducts = status ? this.products.filter((x) => x['price'] >= 201) : filteredProducts;
            break;
          default: break;
        }
        break;
      case "category":
        console.log("dofilter",type,value,status);
        // this.products.filter((x) => x['categories'] === value);
        break;
      case "pickup":
        filteredProducts = status ? this.products.filter((x) => x['canShipYN'] !== status) : filteredProducts;
        console.log("dofilter",type,value,status);
        break;
      default:
        break;
    }
    return filteredProducts;
  }

  filterUpdate(type: string, value: string, status: boolean) {
    console.log(type, value, status);
    console.log(this.products);
    
    // append filter to list of filters; overwrite on second time
    this.filters[type] = {type, value, status};

    // start unfiltered
    let filteredProducts: iProduct[] = this.products;

    // filter for each in filters
    for (let key in this.filters) {
      let t = this.filters[key].type;
      let v = this.filters[key].value;
      let s = this.filters[key].status;
      filteredProducts = this.doFilter(t, v, s, filteredProducts);
    }

    this.updateView(filteredProducts);
    console.log(filteredProducts);
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
