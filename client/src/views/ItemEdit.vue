<template>
<div class="itemedit">
  <AdminHeader/>
  <body>
    <h2 class="title is-2">Add/Edit Product</h2>
    <div class="columns">
      <div class="column is-one-third">
        <div>
          <div>
            <label>Product Name</label>
          </div>
          <input class="input" v-model="item.title" type="text">
        </div>
        <div>
          <div>
            <label>Image URL</label>
          </div>
          <input class="input" v-model="item.photoURL" type="text">
        </div>
        <div>
          <div>
            <label>Price</label>
          </div>
          <input class="input" v-model="item.price" type="number">
        </div>
        <div>
          <div>
            <label>Sale Price</label>
          </div>
          <input class="input" v-model="item.salesPrice" type="number">
        </div>
        <div style="margin-top: 5px">
          <label>On Sale?</label>
        </div>
        <div class="control">
          <label class="radio">
            <input type="radio" v-model="item.saleYN" v-bind:value="true">
            Yes
          </label>
          <label class="radio">
            <input type="radio" v-model="item.saleYN" v-bind:value="false">
            No
          </label>
        </div>
        <div>
          <div>
            <label>Description</label>
          </div>
          <textarea class="textarea has-fixed-size" v-model="item.desc"></textarea>
        </div>
        <div>
          <div>
            <label>Total Available</label>
          </div>
          <input class="input" v-model="item.stock" type="number">
        </div>
        <div style="margin-top: 5px">
          <label>Can Ship?</label>
        </div>
        <div class="control">
          <label class="radio">
            <input type="radio" v-model="item.canShipYN" v-bind:value="true">
            Yes
          </label>
          <label class="radio">
            <input type="radio" name="no" v-model="item.canShipYN" v-bind:value="false">
            No
          </label>
        </div>
      </div>
      <div class="column">
        <h3 class="title is-3">Brands</h3>
        <div class="select">
          <select v-model="brandID">
            <option
              v-for="(brand, index) in brands"
              v-bind:key="index"
              :value="brand.id"
            >{{brand.name}}</option>
          </select>
        </div>
        <h3 class="title is-3" style="margin-top: 15px">Categories</h3>
        <p class="subtitle is-5">(Use cmd or ctrl for multiple)</p>
        <div class="select is-multiple">
          <select v-model="selected" multiple="true">
            <option
              v-for="(category, index) in categories"
              v-bind:key="index"
              :value="category.id"
            >{{category.name}}</option>
          </select>
        </div>
      </div>
    </div>
    <div style="margin-bottom: 50px">
      <button class="button" style="margin-right: 15px" v-on:click="addProduct">Save</button>
      <router-link class="button" to="/inventory">Cancel</router-link>
    </div>
  </body>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import AdminHeader from "@/components/AdminHeader.vue";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { iProduct } from "@/models/product.interface";
import { Brand } from "@/models/brand.interface";
import { Category } from "@/models/category.interface";

@Component({
  components: {
    AdminHeader
  }
})
export default class ItemEdit extends Vue {
  @Prop() id: string | undefined;
  item: iProduct = {
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
  brands: Brand[] = [];
  categories: Category[] = [];
  brandID: number = 0;
  selected: Category[] = [];

  mounted() {
    if (this.id != "0") {
      axios.get(APIConfig.buildUrl("/shop/" + this.id)).then(response => {
        this.item = response.data.product;
      });
    }
    axios.get(APIConfig.buildUrl("/brand")).then(response => {
      this.brands = response.data.brands;
    });
    axios.get(APIConfig.buildUrl("/category")).then(response => {
      this.categories = response.data.categories;
    });
  }

  addProduct() {
    if (this.id == "0") {
      axios
        .post(APIConfig.buildUrl("/shop"), {
          ...this.item
        })
        .then(res => {
          if (res.status == 200) {
            this.$router.push("/inventory");
          }
        })
        .catch(res => {});
    } else {
      axios
        .put(APIConfig.buildUrl("/shop/" + this.id), {
          ...this.item
        })
        .then(res => {
          if (res.status == 200) {
            this.$router.push("/inventory");
          }
        })
        .catch(res => {});
    }
  }
}
</script>

<style scoped>
.input {
  width: 500px;
}
</style>
