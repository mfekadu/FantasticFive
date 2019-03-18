<template>
<div class="confirmation">
  <Header/>
  <body>
    <div class="center">
      <p>Order Number: <b>{{ id }}</b>
        <br>
        <br><b>To review your order and the status of your order enter the above number into tracking!</b>
        <br>
        <br>Call (805) 555-5555 for any questions regarding your order.
        <br>Thank you for your purchase!
        <br>
      </p>
    </div>
  </body>
  <Footer/>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";

@Component({
  components: {
    Footer,
    Header
  }
})
export default class Confirmation extends Vue {
  @Prop()
  id: string | undefined;
}
</script>

<style scoped>
.center {
  text-align: center;
}
</style>
