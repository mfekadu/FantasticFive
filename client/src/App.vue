<template>
  <div id="app">
    <button class="button">
      <a href="order_list.html">Employee Login</a>
    </button>
    <button class="button" style="float:right">
      <a href="trackOrder.html">Track Order</a>
    </button>
    <button class="button" style="float:right">
      <router-link to="/cart" exact-active-class="is-active">Cart</router-link>
    </button>

    <h1 class="title is-1" style="text-align: center">Foxycle</h1>

    <ul>
      <li>
        <router-link to="/" exact-active-class="is-active">Home</router-link>
      </li>
      <li>
        <router-link to="/services">Services</router-link>
      </li>
      <li>
        <router-link to="/shop">Shop</router-link>
      </li>
    </ul>
    <br>
    <router-view class="container"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({})
export default class App extends Vue {}
</script>


<style lang="scss">
@import "~bulma/css/bulma.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

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

/* Change the link color to #111 (black) on hover */
li a:hover {
  background-color: #111;
}
</style>