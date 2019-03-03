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

.product-image {
}
</style>

<template>
  <div class="shop">
    <Header/>
    <h2 class="title is-2" style="text-align:center">Shop</h2>

    <div class="columns productsContainer">
        <div class="column filterColumn is-one-fifth">
            <ProductFilters/>

        </div>
        <div class="column outerProductsContainer">
            <div class="columns innerProductsContainer">
                <div class="column productColumn" id="productsColumn1">
                    <ProductsList/>
                </div>
                <div class="column productColumn" id="productsColumn2">
                    <ProductsList/>
                </div>
                <div class="column productColumn" id="productsColumn3">
                    <ProductsList/>
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

@Component({
  components: {
    Footer,
    Header,
    ProductsList,
    ProductFilters
  }
})
export default class Shop extends Vue {}
</script>
