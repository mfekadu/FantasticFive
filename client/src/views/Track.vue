<template>
<div class="track">
  <Header/>
  <body>
    <div class="center">
      <h3 class="title is-3">Order Tracking</h3>
      <input class="input" type="text" placeholder="Order Number" v-model='item.val'>
      <br>
      <br>
      <router-link class="button" :to="{path: '/status/'+ item.val }">View Order Status</router-link>
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
export default class Track extends Vue {
  item: test = {
    val: ""
  };
}

export interface test {
  val: string | undefined;
}
</script>

<style scoped>
.center {
  text-align: center;
}

.input {
  width: 15%;
}
</style>
