<template>
<div class="employees">
  <AdminHeader/>
  <body>
    <h3 class="title" style="text-align: center">Employees</h3>
    <div v-for="(employee, index) in employees" v-bind:key="index">
      <div class="columns list-group-item">
        <div class="column is-4">
          <p>{{ employee.firstName }}</p>
        </div>
        <div class="column is-2">
          <button class="button">
            <router-link
              :to="{path: '/employeeedit/'+ employee.id}"
              exact-active-class="is-active"
            >Edit</router-link>
          </button>
        </div>
        <div class="column is-2">
          <button class="button" v-on:click="currentID = employee.id; isShowing = true;">Delete</button>
        </div>
      </div>
    </div>
    <div style="margin-top: 15px">
      <button class="button">
        <router-link to="/employeeedit/0" exact-active-class="is-active">New Employee</router-link>
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
export default class Employees extends Vue {
  employees: User[] = [];
  currentID: number = 0;
  isShowing: boolean = false;

  mounted() {
    this.refreshList();
  }

  refreshList() {
    axios.get(APIConfig.buildUrl("/users")).then(response => {
      this.employees = response.data.users;
    });
  }

  deleteItem(id: number) {
    this.isShowing = false;
    axios.delete(APIConfig.buildUrl("/users/" + id)).then(res => {
      this.refreshList();
    });
  }
}

export interface User {
  firstName: string;
  lastName: string;
  password: string;
  profileUrl: string;
  username: string;
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
