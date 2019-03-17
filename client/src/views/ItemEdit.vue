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
          <input class="input" v-model="item.price" type="number">
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
      <div class="column">Hello</div>
    </div>
    <div style="margin-bottom: 50px">
      <button class="button" style="margin-right: 15px" v-on:click="addUser">Save</button>
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
    brand: "",
    categories: [""],
    stock: 0,
    cartQuantity: 0,
    price: 0,
    saleYN: false,
    salesPrice: 0,
    canShipYN: false,
    photoURL: ""
  };

  mounted() {
    if (this.id != "0") {
      axios.get(APIConfig.buildUrl("/shop/" + this.id)).then(response => {
        this.item = response.data.user;
      });
    }
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
