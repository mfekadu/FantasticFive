<template>
<div class="addcategory">
  <AdminHeader/>
  <body>
    <h2 class="title is-2">Add Category</h2>
    <div>
      <input class="input" v-model="catName" type="text" placeholder="Name">
    </div>

    <div style="margin-top: 15px">
      <button class="button" style="margin-right: 15px" v-on:click="addCat">Save</button>
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
import { Category } from "@/models/category.interface";

@Component({
  components: {
    AdminHeader,
    Modal
  }
})
export default class AddCategory extends Vue {
  isShowing: boolean = false;
  catName: string = "";
  categories: Category[] = [];
  duplicate: boolean = false;

  mounted() {
    axios.get(APIConfig.buildUrl("/category")).then(response => {
      this.categories = response.data.categories;
    });
  }

  addCat() {
    this.duplicate = false;
    for (let c of this.categories) {
      if (c.name == this.catName) {
        this.duplicate = true;
      }
    }
    if (this.duplicate) {
      this.isShowing = true;
      this.catName = "";
    } else {
      this.postCat();
    }
  }

  postCat() {
    axios
      .post(APIConfig.buildUrl("/category"), {
        name: this.catName
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
