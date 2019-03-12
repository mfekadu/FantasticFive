<template>
<div class="serviceedit">
  <AdminHeader/>
  <body>
    <h2 class="title is-2">Add/Edit Service</h2>
    <div>
      <input class="input" v-model="item.title" type="text" placeholder="Title">
    </div>
    <div style="margin-top: 15px">
      <textarea class="textarea has-fixed-size" v-model="item.desc" placeholder="Description"></textarea>
    </div>
    <div style="margin-top: 15px">
      <input class="input" v-model="item.price" type="text" placeholder="Price">
    </div>

    <div style="margin-top: 15px">
      <button class="button" style="margin-right: 15px" v-on:click="addService()">Save</button>
      <router-link class="button" to="/servicelist">Cancel</router-link>
    </div>
  </body>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import AdminHeader from "@/components/AdminHeader.vue";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";

@Component({
  components: {
    AdminHeader
  }
})
export default class ServiceEdit extends Vue {
  @Prop() id: string | undefined;

  item: Service = {
    title: "",
    desc: "",
    price: ""
  };

  mounted() {
    if (this.id != "0") {
      axios.get(APIConfig.buildUrl("/services/" + this.id)).then(response => {
        this.item = response.data.item;
      });
    }
  }

  addService() {
    if (this.id == "0") {
      axios
        .post(APIConfig.buildUrl("/services"), {
          ...this.item
        })
        .then(res => {
          this.$router.push("/servicelist");
        });
    } else {
      axios
        .put(APIConfig.buildUrl("/services/" + this.id), {
          ...this.item
        })
        .then(res => {
          this.$router.push("/servicelist");
        });
    }
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
