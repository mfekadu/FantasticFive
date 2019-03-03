<template>
  <div class="home">
    <Header/>
    <div v-for="(announce, index) in announcements" v-bind:key="index">
      <div class="announcement">{{ announce.title }}</div>
      <div class="announcement-details">{{ announce.desc }}</div>
    </div>
    <Footer/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";

@Component({
  components: {
    Footer,
    Header
  }
})
export default class Home extends Vue {
  item: Announcement = {
    title: "",
    desc: ""
  };

  announcements: Announcement[] = [];

  created() {
    console.log("Home created");
    console.log(this);
    console.log(this.$store);
    console.log(this.$store.state);
    // this log should show the same data as the log in App.vue
    console.log(this.$store.state.cart);
    const duplicatedCartContents = this.$store.state.cart.concat(this.$store.state.cart);
    this.$store.state.cart = duplicatedCartContents;
    // this log should show the same data with duplicate values
    console.log(this.$store.state.cart);
  }

  mounted() {
    axios.get(APIConfig.buildUrl("/announcements")).then(response => {
      this.announcements = response.data.items;
    });
  }
}

export interface Announcement {
  title: string;
  desc: string;
}
</script>

<style scoped>
.announcement {
  font-weight: bold;
  text-align: center;
  font-size: 2em;
  padding: 5px;
  background-color: yellow;
}

.announcement-details {
  text-align: center;
  background-color: yellow;
  font-size: 1.5em;
  padding: 5px;
  margin-bottom: 10px;
}
</style>
