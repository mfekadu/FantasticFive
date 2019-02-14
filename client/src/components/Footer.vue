<template>
  <div class="ffooter">
    <p>
      Hours: Monday-Saturday from 10AM-5PM, CLOSED Sunday | Phone: (805) 555-5555 | Address: 123 Higuera St, San
      Luis Obispo 93401
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Footer extends Vue {}
</script>

<style scoped lang="scss">
.ffooter {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #333;
  color: white;
  text-align: center;
  padding: 15px;
}
</style>
