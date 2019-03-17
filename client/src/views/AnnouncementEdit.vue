<template>
<div class="announcementedit">
  <AdminHeader/>
  <body>
    <h2 class="title is-2">Add/Edit Announcement</h2>
    <div>
      <input class="input" v-model="item.title" type="text" placeholder="Title">
    </div>
    <div style="margin-top: 15px">
      <textarea class="textarea has-fixed-size" v-model="item.desc" placeholder="Description"></textarea>
    </div>

    <div style="margin-top: 15px">
      <button class="button" style="margin-right: 15px" v-on:click="addService">Save</button>
      <router-link class="button" to="/announcementlist">Cancel</router-link>
    </div>
  </body>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import AdminHeader from "@/components/AdminHeader.vue";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";

@Component({
  components: {
    AdminHeader
  }
})
export default class AnnouncementEdit extends Vue {
  @Prop() id: string | undefined;

  item: Announcement = {
    title: "",
    desc: ""
  };

  mounted() {
    if (this.id != "0") {
      axios
        .get(APIConfig.buildUrl("/announcements/" + this.id))
        .then(response => {
          this.item = response.data.item;
        });
    }
  }

  addService() {
    if (this.id == "0") {
      axios
        .post(APIConfig.buildUrl("/announcements"), {
          ...this.item
        })
        .then(res => {
          this.$router.push("/announcementlist");
        });
    } else {
      axios
        .put(APIConfig.buildUrl("/announcements/" + this.id), {
          ...this.item
        })
        .then(res => {
          this.$router.push("/announcementlist");
        });
    }
  }
}

export interface Announcement {
  title: string;
  desc: string;
}
</script>

<style scoped>
.input {
  width: 500px;
}
</style>
