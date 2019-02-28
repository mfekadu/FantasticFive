<template>
<div class="employeeedit">
  <AdminHeader/>
  <body>
    <h2 class="title is-2">Add/Edit Employee</h2>
    <div>
      <input class="input" v-model="item.firstName" type="text" placeholder="First Name">
    </div>
    <div style="margin-top: 15px">
      <input class="input" v-model="item.lastName" type="text" placeholder="Last Name">
    </div>
    <div style="margin-top: 15px">
      <input class="input" v-model="item.username" type="text" placeholder="Username">
    </div>
    <div style="margin-top: 15px">
      <input class="input" v-model="item.password" type="text" placeholder="Password">
    </div>

    <div style="margin-top: 15px">
      <button class="button" style="margin-right: 15px" v-on:click="addUser">
        <router-link to="/employees">Save</router-link>
      </button>
      <button class="button">
        <router-link to="/employees">Cancel</router-link>
      </button>
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
export default class EmployeeEdit extends Vue {
  @Prop()
  id: string | undefined;

  item: User = {
    firstName: "",
    lastName: "",
    password: "",
    username: ""
  };

  mounted() {
    if (this.id != "0") {
      axios.get(APIConfig.buildUrl("/users/" + this.id)).then(response => {
        this.item = response.data.user;
      });
    }
  }

  addUser() {
    if (this.id == "0") {
      axios.post(APIConfig.buildUrl("/users"), {
        ...this.item
      });
    } else {
      axios.put(APIConfig.buildUrl("/users/" + this.id), {
        ...this.item
      });
    }
  }
}

export interface User {
  firstName: string;
  lastName: string;
  password: string;
  username: string;
}
</script>

<style scoped>
.input {
  width: 500px;
}
</style>