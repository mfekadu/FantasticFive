<template>
  <div class="productview">
    <Header/>
    <div style="text-align: center">
      <h2 class="title is-2">{{product.title}}</h2>
      <p class="subtitle is-4">${{product.price}}</p>
      <figure name="image" class="image">
        <img
          style="height: 300px; width: auto; display: block; margin-left: auto; margin-right: auto"
          v-bind:src="getPic128()"
          v-bind:alt="'image of ' + product.title"
        >
      </figure>
      <p>{{product.desc}}</p>
      <p>Stock: {{product.stock}}</p>
      <div style="color: red" v-if="!product.canShipYN">Cannot Ship</div>
    </div>
    <Footer/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { iProduct } from "@/models/product.interface";

@Component({
  components: {
    Footer,
    Header
  }
})
export default class ProductView extends Vue {
  @Prop() id: string | undefined;
  product: iProduct = {
    id: 0,
    title: "",
    desc: "",
    brand: { id: 0, name: "" },
    categories: [{ id: 0, name: "" }],
    stock: 0,
    cartQuantity: 0,
    price: 0,
    saleYN: false,
    salesPrice: 0,
    canShipYN: false,
    photoURL: ""
  };

  mounted() {
    axios.get(APIConfig.buildUrl("/shop/" + this.id)).then(response => {
      this.product = response.data.product;
    });
  }

  getPic128() {
    let p = this.product;
    return p ? p.photoURL : "./128x128.png";
  }
}
</script>

<style scoped>
</style>
