<style scoped>
.center {
  text-align: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>

<template>
  <div class="home">
    <Header/>

    <h2 class="title is-2" style="text-align:center">Services</h2>
    <div style="text-align: center">
      <div
        v-for="(service, index) in services"
        v-bind:key="index"
      >{{ service.title }}: {{ service.desc }}: {{ service.price }}</div>
    </div>

    <div class="center" style="margin-top:20px">
      Call
      <a class="is-link" href="tel:805-555-5555">(805) 555-5555</a>
      to order
    </div>
    <Footer/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";

@Component({
  components: {
    Footer,
    Header
  }
})
export default class Services extends Vue {
  item: Service = {
    title: "",
    desc: "",
    price: ""
  };

  services: Service[] = [];

  mounted() {
    axios.get(APIConfig.buildUrl("/services")).then(response => {
      this.services = response.data.items;
    });
  }
}

export interface Service {
  title: string;
  desc: string;
  price: string;
}
</script>
