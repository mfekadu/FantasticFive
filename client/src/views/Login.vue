<template>
  <div class="login">
    <Header/>
    <div class="center">
      <h2 class="title is-2">Employee Login</h2>
      <h4 class="title is-4" style="color: red">**Not for Customers**</h4>

      <input class="input" type="text" placeholder="Username">
      <br>
      <input class="input" type="password" placeholder="Password">
      <br><br>
      <button class="button"><router-link to="/inventory" exact-active-class="is-active">Login</router-link></button>
    </div>
    <Footer/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";

@Component({
  components: {
    Header,
    Footer
  }
})
export default class Login extends Vue {}
</script>

<style scoped>
.center {
  text-align: center;
}

.input {
  width: 250px;
}
</style>
