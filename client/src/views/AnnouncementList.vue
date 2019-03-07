<template>
<div class="announcementlist">
  <AdminHeader/>
  <body>
    <h3 class="title" style="text-align: center">Announcements</h3>
    <div v-for="(announce, index) in announcements" v-bind:key="index">
      <div class="columns list-group-item">
        <div class="column is-4">
          <p>{{ announce.title }}</p>
        </div>
        <div class="column is-2">
          <button class="button">
            <router-link
              :to="{path: '/announcementedit/'+ announce.id}"
              exact-active-class="is-active"
            >Edit</router-link>
          </button>
        </div>
        <div class="column is-2">
          <button class="button" v-on:click="currentID = announce.id; isShowing = true;">Delete</button>
        </div>
      </div>
    </div>
    <div style="margin-top: 15px">
      <button class="button">
        <router-link to="/announcementedit/0" exact-active-class="is-active">New Announcement</router-link>
      </button>
    </div>
    <modal
      v-bind:is-showing="isShowing"
      title="Confirmation"
      success-button="Delete"
      v-on:success="deleteItem(currentID)"
      v-on:cancel="isShowing = false"
    >Are you sure you want to delete?</modal>
  </body>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";
import AdminHeader from "@/components/AdminHeader.vue";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import Modal from "@/components/Modal.vue";

@Component({
  components: {
    Footer,
    AdminHeader,
    Modal
  }
})
export default class AnnouncementList extends Vue {
  item: Announcement = {
    title: "",
    desc: ""
  };

  announcements: Announcement[] = [];
  currentID: number = 0;
  isShowing: boolean = false;

  mounted() {
    this.refreshList();
  }

  refreshList() {
    axios.get(APIConfig.buildUrl("/announcements")).then(response => {
      this.announcements = response.data.items;
    });
  }

  deleteItem(id: number) {
    this.isShowing = false;
    axios.delete(APIConfig.buildUrl("/announcements/" + id)).then(res => {
      this.refreshList();
    });
  }
}

export interface Announcement {
  title: string;
  desc: string;
}
</script>

<style scoped>
.column {
  margin: auto;
  width: 25%;
}

.center {
  text-align: center;
}

.list-group-item {
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
}
</style>
