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
    <!-- the Shop -->
    <div class="columns productsContainer">
      <!-- the Filters -->
      <div class="column filterColumn is-one-fifth">
        <ProductFilters v-on:filterUpdate="filterUpdate"
                        v-on:brandUpdate="brandUpdate"
                        v-on:categoryUpdate="categoryUpdate"
                        v-on:priceUpdate="priceUpdate"
                        v-on:shippingUpdate="shippingUpdate"/>
      </div>
      <!-- the Products -->
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

import { iFilter, iAllFilters, FT, DEFAULT_SHIP } from "@/models/filter.interface";

import "@/utils/array.utils";

import axios, { AxiosResponse } from "axios";

import { APIConfig } from "../utils/api.utils";

// interface iFilter {
//   type: string;    // brand, category, price, picked
//   value: string;   // a value corresponding to a key in an iProduct object
//   status: boolean; // to include or not include in filtered array
// }

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
    axios.get(APIConfig.buildUrl("/shop"))
    
    .then(response => {
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
    })
    .catch(reason => {
      this.brandUpdate(this.givenFilters);
      // update the view
      // this.updateView(this.products);
      console.log(this.products);
    })
    ;
  }

  // filters is a map of the filter type to an iFilter object
  // e.g. { 'brand' : <iFilter> }
  filters : {[type: string] : iFilter} = {};

  // given the type of filter, the value to filter by, and the status of include or not include in the filtered array
  // output a filtered iProduct array starting from this.products
  // optionally provide an array as a starting point
  doFilter(type: string, value: string, status: boolean, arr: iProduct[] | undefined) : iProduct[] {
    let filteredProducts: iProduct[] = (arr) ? arr : this.products;
    console.log("arr?",arr, "filteredProducts?",filteredProducts, "this.products?",this.products);

    // define the Cond predicate type
    type Cond = (arg0: iProduct) => boolean

    // cond is a helper lambda function for filtering
    let cond: Cond;

    // list of conditions to filter later
    let conditions: Cond[] = [];

    switch (type) {
      case "brand":
        cond = (x) => { return x['brand'] === value };
        conditions.push(cond);
        // filter products if status is true
        // filteredProducts = status ? this.products.filter(x => x.brand === value) : filteredProducts;
        break;
      case "price":
        switch (value) {
          // TODO: simplify this by having price tag have value=###
          case "under $50":
            cond = (x) => { return x['price'] <= 50 };
            conditions.push(cond);
            // filteredProducts = status ? this.products.filter((x) => x['price'] <= 50) : filteredProducts;
            break;
          case "$51 - $100":
            cond = (x) => { return (x['price'] >= 51 && x['price'] <= 100) };
            conditions.push(cond);
            // cond = (x) => {  };
            // filteredProducts = status ? this.products.filter((x) => cond(x)) : filteredProducts;
            break;
          case "$101 - $200":
            cond = (x) => { return (x['price'] >= 101 && x['price'] <= 200) };
            conditions.push(cond);
            // cond = (x) => {  };
            // filteredProducts = status ? this.products.filter((x) => cond(x)) : filteredProducts;
            break;
          case "$201+":
            cond = (x) => { return x['price'] >= 201 };
            conditions.push(cond);
            // filteredProducts = status ? this.products.filter((x) => ) : filteredProducts;
            break;
          default: break;
        }
        break;
      case "category":
        console.log("dofilter",type,value,status);
        // this.products.filter((x) => x['categories'] === value);
        break;
      case "shipping":
        cond = (x) => { return x['canShipYN'] !== status };
        conditions.push(cond);
        // filteredProducts = status ? this.products.filter((x) => ) : filteredProducts;
        break;
      default:
        break;
    }

    // helper to call all cond on one product
    // for when 
    const allCondFunc : Cond = (x: iProduct) => { 
      let res : boolean = true;
      for (const key in conditions) {
        const func = conditions[key];
        res = res && func(x);
      }
      return res;
    }

    // for (let fun of conditions) {
    filteredProducts = status ? this.products.filter(allCondFunc) : filteredProducts;
    // }
    return filteredProducts;
  }

  // filters is a map of the filter type to an iFilter object
  // e.g. { 'brand' : <iFilter> }
  newf : { [type: string] : { [value: string] : iFilter } } = {};

  givenFilters : iAllFilters = {
    brands : [], 
    categories : [],
    prices : [],
    shipping : DEFAULT_SHIP
  };

  brandUpdate(data: iAllFilters) {
    // const { type, value, status } = brand;
    // console.log("brandUpdate", type, value, status);
    // console.log('same?', this.applesauce);
    // this.applesauce = "banana";
    // console.log("update...",data);
    // console.log(data.shipping.status);
    // console.log(typeof data.shipping.status);
    this.givenFilters = data;
    let products : iProduct[] = this.products;
    let filteredByBrand : iProduct[] = [];
    let filteredByPrice : iProduct[] = [];
    let filteredByCategory : iProduct[] = [];
    let filteredByShipping : iProduct[] = [];
    let finalFilter : iProduct[] = this.products;
    // these booleans get set to true iff a checkbox is checked
    let includeBrand : boolean = false;
    let includePrice : boolean = false;
    let includeCategory : boolean = false;
    let includeShipping : boolean = false;
    let temp : iProduct[] = [];
    // define the Cond predicate type
    type Cond = (arg0: iProduct) => boolean

    // cond is a helper lambda function for filtering
    let cond: Cond;

    for (const brand of data.brands) {
      if (brand.status) {includeBrand=true}
      // console.log({...brand}, products);
      cond = (x) => {return x.brand === brand.value};
      // include depending on brand.status
      temp = (brand.status) ? products.filter(cond) : [];
      filteredByBrand = filteredByBrand.union(temp);
    }
    console.log("Shop brandUpdate filteredByBrand:",filteredByBrand);

    let filtered: any[] = [];

    for (const price of data.prices) {
      if (price.status) {includePrice=true}
      // console.log({...price});
      // "$0 - $50" --> ['0', '50']
      // "$201+" --> ['201']
      const tuple: any[] = price.value.replace(new RegExp('\\$|\\+|\\-','g'), '').split(/\s+/)
      const min = parseInt(tuple[0]);
      const max = (tuple[1]) ? parseInt(tuple[1]) : Number.MAX_SAFE_INTEGER;
      console.log("min max", min, max);
      cond = (x) => { return (x['price'] >= min && x['price'] <= max) };
      temp = (price.status) ? products.filter(cond) : [];
      filteredByPrice = filteredByPrice.union(temp);
    }
    console.log("Shop brandUpdate filteredByPrice.and():",filteredByPrice.intersection(filteredByBrand));
    console.log("Shop brandUpdate filteredByPrice:",filteredByPrice);

    for (const category of data.categories) {
      // if (category.status) {includeCategory=true}
      // 
    }

    cond = (x) => { return x['canShipYN'] === data.shipping.status };
    temp = (data.shipping.status) ? products.filter(cond) : [];
    filteredByShipping = filteredByPrice.union(temp);


    console.log("at the end");
    console.log(filteredByBrand);
    console.log(filteredByCategory);
    console.log(filteredByPrice);
    console.log(filteredByShipping);
    if (includeBrand) {
      finalFilter = finalFilter.intersection(filteredByBrand);
    }
    if (includeCategory) {
      finalFilter = finalFilter.intersection(filteredByCategory);
    }
    if (includePrice) {
      finalFilter = finalFilter.intersection(filteredByPrice);
    }
    if (includeShipping) {
      finalFilter = finalFilter.intersection(filteredByShipping);
    }

    this.updateView(finalFilter);

  }

  categoryUpdate(category: iFilter) {
    const { type, value, status } = category;
    console.log("categoryUpdate", type, value, status);
    this.newf[type] = (this.newf[type]) ? this.newf[type] : {};
    this.newf[type][value] = category;
    this.fillUp();
  }

  priceUpdate(price: iFilter) {
    const { type, value, status } = price;
    console.log("priceUpdate", type, value, status);
    this.newf[type] = (this.newf[type]) ? this.newf[type] : {};
    this.newf[type][value] = price;
    this.fillUp();
  }

  shippingUpdate(ship: iFilter) {
    const { type, value, status } = ship;
    console.log("shippingUpdate", type, value, status);
    this.newf[type] = (this.newf[type]) ? this.newf[type] : {};
    this.newf[type][value] = ship;
    this.fillUp();
  }

  fillUp() {
    console.log('fillUp', this.products, "newf", this.newf);
    let filteredProducts: iProduct[] = this.products;
    // filter for each in newf
    for (let key in this.newf) {
      let newlyFiltered: iProduct[] = [];
      for (let key2 in this.newf[key]){
        let t = this.newf[key][key2].type;
        let v = this.newf[key][key2].value;
        let s = this.newf[key][key2].status;
        let temp = newlyFiltered;
        console.log("temp", temp);
        newlyFiltered = this.doFilter(t, v, s, this.products);
        let unionArray = [...new Set([...newlyFiltered, ...temp])];
        newlyFiltered = unionArray;
      }
      let intersection = [...new Set(filteredProducts)].filter(x => new Set(newlyFiltered).has(x))
      filteredProducts = intersection;
    }
    console.log('full', filteredProducts);
    this.updateView(filteredProducts);
  }

  filterUpdate(type: string, value: string, status: boolean) {
    console.log(type, value, status);
    console.log(this.products);

    // append filter to list of filters; overwrite on second time
    this.filters[type] = {type, value, status};
    console.log("this.filters...",this.filters);

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
