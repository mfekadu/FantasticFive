<template>
  <div class="home">
    <div class="announcement">ANNOUNCEMENT</div>
    <div class="announcement-details">ANNOUNCEMENT DETAILS</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
  }
})
export default class Home extends Vue {}
</script>

<style scoped>
.announcement {
  font-weight: bold;
  text-align: center;
  font-size: 2em;
  padding: 20px;
  background-color: yellow;
}

.announcement-details {
  text-align: center;
  background-color: yellow;
  font-size: 1.5em;
  padding: 20px;
  margin-bottom: 10px;
}
</style>
