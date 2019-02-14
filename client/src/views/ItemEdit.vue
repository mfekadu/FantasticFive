<template>
<div class="inventory">
  <AdminHeader/>
  <body>
    <h2 class="title is-2">Add/Edit Item</h2>
    <input class="input" type="text" placeholder="Item Name">
    <br>
    <input class="input" type="text" placeholder="Image URL">
    <br>
    <input class="input" type="text" placeholder="Price">
    <br>
    <input class="input" type="text" placeholder="Quantity">
    <br>
    <br>

    <div class="control">
      <label class="radio">
        <input type="radio" name="answer">
        In Store Only
      </label>
      <label class="radio">
        <input type="radio" name="answer">
        Can Ship
      </label>
      <br>
      <br>
      <button class="button" style="margin-right: 15px">
        <router-link to="/inventory">Save</router-link>
      </button>
      <button class="button">
        <router-link to="/inventory">Cancel</router-link>
      </button>
    </div>
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
export default class Inventory extends Vue {}
</script>

<style scoped>
.input {
  width: 500px;
}
</style>