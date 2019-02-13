<template>
<div class="track">
  <Header/>
  <body>
    <div class="center">
      <h3 class="title is-3">Order Tracking</h3>
      <input class="input" type="text" placeholder="Order Number">
      <br>
      <br>
      <button class="button">
        <router-link to="/status">View Order Status</router-link>
      </button>
    </div>
  </body>
  <Footer/>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";

@Component({
  components: {
    Footer,
    Header
  }
})
export default class Track extends Vue {}
</script>

<style scoped>
.center {
  text-align: center;
}

.input {
  width: 15%;
}
</style>
