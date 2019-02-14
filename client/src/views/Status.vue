<template>
<div class="status">
  <Header/>
  <body>
    <div class="columns">
      <div class="column">
        <h2 class="title is-2">Order #F2453</h2>
        <h3 class="title is-3">Status: Ready to Ship</h3>Trek Bike *Picture*
        <br>$499
        <br>Quantity: 1
        <br>
        <br>Bike Pump *Picture*
        <br>$29
        <br>Quantity: 1
        <br>
      </div>
      <div class="column">
        <h3 class="title is-3">Shipping Details</h3>John Smith
        <br>123 Street,
        <br>San Luis Obispo 93405
        <br>
        <br>
        <h3 class="title is-3">Payment Details</h3>John Smith
        <br>Card #: ****1234
        <br><br>
        <div style="color: red">Call (805) 555-5555 for any questions</div>
      </div>
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
export default class Status extends Vue {}
</script>

<style scoped>
</style>