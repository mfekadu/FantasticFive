<template>
<div class="service_details">
  <AdminHeader/>
  <body>
    <h2 class="title is-2">Add/Edit Service</h2>
    <input class="input" v-model="item.title" type="text" placeholder="Title">
    <br>
    <textarea class="textarea has-fixed-size" v-model="item.desc" placeholder="Description"></textarea>
    <br>
    <input class="input" v-model="item.price" type="text" placeholder="Price">
    <br>
    <br>
    <button class="button" style="margin-right: 15px" v-on:click="addService">
      <router-link to="/editservices">Save</router-link>
    </button>
    <button class="button">
      <router-link to="/editservices">Cancel</router-link>
    </button>
  </body>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AdminHeader from "@/components/AdminHeader.vue";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";

@Component({
  components: {
    AdminHeader
  }
})
export default class ServiceDetails extends Vue {
  item: Service = {
    title: "",
    desc: "",
    price: ""
  };

  addService() {
    axios.post(APIConfig.buildUrl("/services"), {
      ...this.item
    });
  }
}

export interface Service {
  title: string;
  desc: string;
  price: string;
}
</script>

<style scoped>
.input {
  width: 500px;
}
</style>