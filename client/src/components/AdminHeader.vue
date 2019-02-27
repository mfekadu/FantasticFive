<template>
  <div id="admin_header">
    <br>
    <button class="button" style="float:right">
      <router-link to="/" exact-active-class="is-active">Logout</router-link>
    </button>
    <br>
    <br>
    <h1 class="title is-1" style="text-align: center">Foxycle Employees</h1>

    <ul>
      <li>
        <router-link to="/orders">Orders</router-link>
      </li>
      <li>
        <router-link to="/inventory">Inventory</router-link>
      </li>
      <li>
        <router-link to="/employees">Employees</router-link>
      </li>
      <li>
        <router-link to="/announcementlist">Announcements</router-link>
      </li>
      <li>
        <router-link to="/servicelist">Services</router-link>
      </li>
    </ul>
    <br>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({})
export default class AdminHeader extends Vue {}
</script>

<style scoped lang="scss">
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: center;
  overflow: hidden;
  background-color: #333;
}

li {
  display: inline-block;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover {
  background-color: #111;
}
</style>