<template>
  <div id="header">
    <br>
    <router-link class="button" to="/login" exact-active-class="is-active">Employee Login</router-link>
    <router-link class="button" style="float:right" to="/track" exact-active-class="is-active">Track Order</router-link>
    <router-link class="button" style="float:right" to="/cart" exact-active-class="is-active">Cart</router-link>

    <h1 class="title is-1" style="text-align: center">
      <router-link to="/" exact-active-class="is-active"><img src="/foxcyclelogo@2x.png" style="height: 150px"></router-link>
    </h1>

    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/services">Services</router-link>
      </li>
      <li>
        <router-link to="/shop">Shop</router-link>
      </li>
    </ul>
    <br>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({})
export default class Header extends Vue {}
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
