<template>
<div class="servicelist">
  <AdminHeader/>
  <body>
    <h3 class="title" style="text-align: center">Services</h3>
    <div v-for="(service, index) in services" v-bind:key="index">
      <div class="columns list-group-item">
        <div class="column is-4">
          <p>{{ service.title }}</p>
        </div>
        <div class="column is-2">
          <router-link
            class="button"
            :to="{path: '/serviceedit/'+ service.id}"
            exact-active-class="is-active"
          >Edit</router-link>
        </div>
        <div class="column is-2">
          <button class="button" v-on:click="currentID = service.id; isShowing = true;">Delete</button>
        </div>
      </div>
    </div>
    <div style="margin-top: 15px">
      <router-link class="button" to="/serviceedit/0" exact-active-class="is-active">New Service</router-link>
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
export default class ServiceList extends Vue {
  services: Service[] = [];
  currentID: number = 0;
  isShowing: boolean = false;

  mounted() {
    this.refreshList();
  }

  refreshList() {
    axios.get(APIConfig.buildUrl("/services")).then(response => {
      this.services = response.data.items;
    });
  }

  deleteItem(id: number) {
    this.isShowing = false;
    axios.delete(APIConfig.buildUrl("/services/" + id)).then(res => {
      this.refreshList();
    });
  }
}

export interface Service {
  title: string;
  desc: string;
  price: string;
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
