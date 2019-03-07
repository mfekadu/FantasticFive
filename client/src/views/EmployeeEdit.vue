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
    <div class="control" style="margin-top: 15px">
      <label class="radio">
        <input type="radio" name="yes" v-model="item.admin" v-bind:value="true">
        Admin
      </label>
      <label class="radio">
        <input type="radio" name="no" v-model="item.admin" v-bind:value="false">
        Employee
      </label>
    </div>

    <div style="margin-top: 15px">
      <button class="button" style="margin-right: 15px" v-on:click="addUser">Save</button>
      <router-link class="button" to="/employees">Cancel</router-link>
    </div>
    <modal
      v-bind:is-showing="isShowing"
      title="Error"
      success-button="Ok"
      v-on:success="isShowing = false"
      v-on:cancel="isShowing = false"
    >Username is not unique</modal>
  </body>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import AdminHeader from "@/components/AdminHeader.vue";
import axios, { AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import Modal from "@/components/Modal.vue";

@Component({
  components: {
    AdminHeader,
    Modal
  }
})
export default class EmployeeEdit extends Vue {
  @Prop() id: string | undefined;
  isShowing: boolean = false;
  item: User = {
    firstName: "",
    lastName: "",
    password: "",
    username: "",
    admin: false
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
      axios
        .post(APIConfig.buildUrl("/users"), {
          ...this.item
        })
        .then(res => {
          if (res.status == 200) {
            this.$router.push("/employees");
          }
        })
        .catch((res) => {
          this.isShowing = true;
      });
    } else {
      axios
        .put(APIConfig.buildUrl("/users/" + this.id), {
          ...this.item
        })
        .then(res => {
          if (res.status == 200) {
            this.$router.push("/employees");
          }
        })
        .catch((res) => {
          this.isShowing = true;
      });
    }
  }
}

export interface User {
  firstName: string;
  lastName: string;
  password: string;
  username: string;
  admin: boolean;
}
</script>

<style scoped>
.input {
  width: 500px;
}
</style>
