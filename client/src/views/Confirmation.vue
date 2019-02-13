<template>
<div class="confirmation">
  <body>
    <div class="center">
      <p>Order Number: #F2453
        <br>
        <router-link to="/track">Track Order</router-link>
        <br>
        <br>Call (805) 555-5555 for any questions regarding your order
        <br>Thank you for your purchase!
        <br>
      </p>
    </div>
  </body>
  <Footer/>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";

@Component({
  components: {
    Footer
  }
})
export default class Confirmation extends Vue {}
</script>

<style scoped>
.center {
  text-align: center;
}
</style>
