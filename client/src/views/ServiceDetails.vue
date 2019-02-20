<template>
<div class="service_details">
  <AdminHeader/>
  <body>
    <h2 class="title is-2">Add/Edit Service</h2>
    <input class="input" type="text" placeholder="Title">
    <br>
    <textarea class="textarea has-fixed-size" placeholder="Description"></textarea>
    <br>
    <input class="input" type="text" placeholder="Price">
    <br>
    <br>
    <button class="button" style="margin-right: 15px">
      <router-link to="/inventory">Save</router-link>
    </button>
    <button class="button">
      <router-link to="/inventory">Cancel</router-link>
    </button>
  </body>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AdminHeader from "@/components/AdminHeader.vue";

@Component({
  components: {
    AdminHeader
  }
})
export default class ServiceDetails extends Vue {}
</script>

<style scoped>
.input {
  width: 500px;
}
</style>