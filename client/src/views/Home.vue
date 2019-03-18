<template>
  <div class="home">
    <Header />
    <div class="content" style="margin-bottom:10em">
      <div v-for="(announce, index) in announcements" v-bind:key="index">
        <div class="announcement">{{ announce.title }}</div>
        <div class="announcement-details">{{ announce.desc }}</div>
      </div>
      <div style="text-align: center;">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.2349594014954!2d-120.66442254896188!3d35.30014288018806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ecf1b3ba70fff3%3A0x4b4cd567ef80b51e!2sFrank+E.+Pilling+Computer+Science%2C+San+Luis+Obispo%2C+CA+93405!5e0!3m2!1sen!2sus!4v1552885472191"
          width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
      </div>
    </div>
    <Footer />
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
