<template>
  <div id="app">
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
a {
  color: #363636;
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