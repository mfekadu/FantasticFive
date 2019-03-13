<template>
<div class="itemedit">
  <AdminHeader/>
  <body>
    <h2 class="title is-2">Add/Edit Item</h2>
    <div>
      <input class="input" v-model="item.title" type="text" placeholder="Name">
    </div>
    <div style="margin-top: 15px">
      <input class="input" v-model="item.price" type="number" placeholder="Price">
    </div>
    <div style="margin-top: 15px">
      <textarea class="textarea has-fixed-size" v-model="item.desc" placeholder="Description"></textarea>
    </div>
    <div style="margin-top: 15px">
      <input class="input" v-model="item.stock" type="number" placeholder="Total Available">
    </div>
    <div style="margin-top: 15px">
      <input class="input" v-model="item.password" type="text" placeholder="Password">
    </div>
    <div class="control" style="margin-top: 15px">
      <label class="radio">
        <input type="radio" name="yes" v-model="item.admin" v-bind:value="true">
        Admin
      </label>
      <label class="radio">
        <input type="radio" name="no" v-model="item.admin" v-bind:value="false">
        Employee
      </label>
    </div>

    <div style="margin-top: 15px">
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
export default class EmployeeEdit extends Vue {
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
    canShipYN: true,
    photoURL: ""
  };

  mounted() {
    if (this.id != "0") {
      axios.get(APIConfig.buildUrl("/shop/" + this.id)).then(response => {
        this.item = response.data.user;
      });
    }
  }

  addUser() {
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
        .catch(res => {
        });
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
        .catch(res => {
        });
    }
  }
}
</script>

<style scoped>
.input {
  width: 500px;
}
</style>
