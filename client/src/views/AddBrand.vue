<template>
<div class="addbrand">
  <AdminHeader/>
  <body>
    <h2 class="title is-2">Add Brand</h2>
    <div>
      <input class="input" v-model="brandName" type="text" placeholder="Name">
    </div>

    <div style="margin-top: 15px">
      <button class="button" style="margin-right: 15px" v-on:click="addBrand">Save</button>
      <router-link class="button" to="/inventory">Cancel</router-link>
    </div>
    <modal
      v-bind:is-showing="isShowing"
      title="Error"
      success-button="Ok"
      v-on:success="isShowing = false"
      v-on:cancel="isShowing = false"
    >Name is not unique</modal>
  </body>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AdminHeader from "@/components/AdminHeader.vue";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import Modal from "@/components/Modal.vue";
import { Brand } from "@/models/brand.interface";

@Component({
  components: {
    AdminHeader,
    Modal
  }
})
export default class AddBrand extends Vue {
  isShowing: boolean = false;
  brandName: string = "";
  brands: Brand[] = [];
  duplicate: boolean = false;

  mounted() {
    axios.get(APIConfig.buildUrl("/brand")).then(response => {
      this.brands = response.data.brands;
    });
  }

  addBrand() {
      this.duplicate = false;
      for (let b of this.brands) {
          if (b.name == this.brandName) {
              this.duplicate = true;
          }
      }
      if (this.duplicate) {
          this.isShowing = true;
          this.brandName = "";
      } else {
          this.postBrand();
      }
  }

  postBrand() {
    axios
      .post(APIConfig.buildUrl("/brand"), {
        name: this.brandName
      })
      .then(res => {
        this.$router.push("/inventory");
      });
  }
}
</script>

<style scoped>
.input {
  width: 500px;
}
</style>
