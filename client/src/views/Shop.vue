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

#toast {
    visibility: hidden;
    max-width: 50px;
    height: 50px;
    /*margin-left: -125px;*/
    margin: auto;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 2px;

    position: fixed;
    z-index: 1;
    left: 0;right:0;
    bottom: 30px;
    font-size: 17px;
    white-space: nowrap;
}
#toast #img{
	width: 50px;
	height: 50px;
    
    float: left;
    
    padding-top: 16px;
    padding-bottom: 16px;
    
    box-sizing: border-box;

    
    background-color: #111;
    color: #fff;
}
#toast #desc{

    
    color: #fff;
   
    padding: 16px;
    
    overflow: hidden;
	white-space: nowrap;
}

#toast.show {
    visibility: visible;
    -webkit-animation: fadein 0.5s, expand 0.5s 0.5s,stay 3s 1s, shrink 0.5s 2s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, expand 0.5s 0.5s,stay 3s 1s, shrink 0.5s 4s, fadeout 0.5s 4.5s;
}

@-webkit-keyframes fadein {
    from {bottom: 0; opacity: 0;} 
    to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes expand {
    from {min-width: 50px} 
    to {min-width: 350px}
}

@keyframes expand {
    from {min-width: 50px}
    to {min-width: 350px}
}
@-webkit-keyframes stay {
    from {min-width: 350px} 
    to {min-width: 350px}
}

@keyframes stay {
    from {min-width: 350px}
    to {min-width: 350px}
}
@-webkit-keyframes shrink {
    from {min-width: 350px;} 
    to {min-width: 50px;}
}

@keyframes shrink {
    from {min-width: 350px;} 
    to {min-width: 50px;}
}

@-webkit-keyframes fadeout {
    from {bottom: 30px; opacity: 1;} 
    to {bottom: 60px; opacity: 0;}
}

@keyframes fadeout {
    from {bottom: 30px; opacity: 1;}
    to {bottom: 60px; opacity: 0;}
}
</style>

<template>
  <div class="shop">
    <Header/>
        <div id="toast"><div id="img">Icon</div><div id="desc">A notification message..</div></div>
    <h2 class="title is-2" style="text-align:center">Shop</h2>

    <div class="columns productsContainer">
        <div class="column filterColumn is-one-fifth">
            <ProductFilters/>

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
    brand: "",
    categories: [""],
    inventoryQuantity: 3,
    cartQuantity: 0,
    price: 499,
    saleYN: false,
    salesPrice: 499,
    canShipYN: false,
    photoURL: "./logo.png"
  };

  p2: iProduct = {
    id: 1,
    title: "B Bike Pump",
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

  products: iProduct[] = [this.p1, this.p2, this.p3, this.p4, this.p5,this.p5,this.p5,this.p1,this.p2,this.p3,this.p4,];
  threeChunkProducts: iProduct[] = [];

  created() {
    this.threeChunkProducts = this.splitArrayInto(this.products, 3);
  }

  // given an array and a chunk, split the array into chunks with row-major ordering
  // given arr=[1,2,3,4], chunk=2 -> expect [[1,3],[2,4]]
  // given arr=[1,2,3,4], chunk=2 -> do NOT expect [[1,2],[3,4]]
  splitArrayInto = (arr: Array<any>, chunk: number): Array<any> => {
    let i; let j; let temp = [];
    for (let col = 0; col < chunk; col++) {
      let colElements = [];
      for (let row = col; row < arr.length; row+=chunk) {
        colElements.push(arr[row]);
      }
      temp.push(colElements);
    }
    return temp;
  }
}
</script>
