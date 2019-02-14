<template>
  <div class="inventory">
    <AdminHeader/>
    <h2 class="title is-2">Inventory</h2>
    <div>
      <button class="button">
        <router-link to="/itemedit" exact-active-class="is-active">Add Item</router-link>
      </button>
    </div>
    <div v-for="(Part, index) in myParts" v-bind:key="index">
      <div class="table">
        <div class="row">
          <div class="cell col1">
            <input type="checkbox" name="name1" id="1">
            <br>
          </div>
          <div class="cell col2">
            <span>{{ Part.name }}</span>
          </div>
          <div class="cell col4">
            <button class="button" style="margin-right: 15px" name="btn-delete">Delete</button>
            <button class="button" name="btn-Edit">
              <router-link to="/itemedit" exact-active-class="is-active">Edit</router-link>
            </button>
          </div>
        </div>
      </div>
    </div>
    <br>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";

import { Component } from "vue-property-decorator";
import AdminHeader from "@/components/AdminHeader.vue";

@Component({
  components: {
    AdminHeader
  }
})
export default class Inventory extends Vue {
  // this export says, if another files imports this file,
  // then it only gets this component
  myParts: Part[] = [
    { name: "Trek Bike" },
    { name: "Bike Pump" },
    { name: "Tire" }
  ];
  item: Part = {
    name: ""
  };
}
interface Part {
  name: string;
}
</script>

<style scoped>
.input {
  width: 500px;
}
</style>