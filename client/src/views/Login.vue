<template>
  <div class="login">
    <Header/>
    <div class="center">
      <h2 class="title is-2">Employee Login</h2>
      <h4 class="title is-4" style="color: red">**Not for Customers**</h4>

      <div style="margin-bottom: 5px">
        <input class="input" type="text" v-model="signin.username" placeholder="Username">
      </div>
      <div>
        <input class="input" v-model="signin.password" type="password" placeholder="Password">
      </div>
      <br>
      <button class="button" v-on:click="login()">Login</button>
    </div>
    <modal
      v-bind:is-showing="isShowing"
      title="Unsuccessful Login Attempt"
      success-button="Ok"
      v-on:success="isShowing = false"
      v-on:cancel="isShowing = false"
    >Incorrect username/password. This login is only for employees.</modal>
    <Footer/>
  </div>
</template>

<script lang="ts">
import axios, { AxiosError, AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Vue } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import Modal from "@/components/Modal.vue";

@Component({
  components: {
    Header,
    Footer,
    Modal
  }
})
export default class Login extends Vue {
  signin: LoginForm = {
    username: "",
    password: ""
  };

  error: string | boolean = false;
  isShowing: boolean = false;

  login() {
    this.error = false;
    axios
      .post(APIConfig.buildUrl("/login"), {
        username: this.signin.username,
        password: this.signin.password
      })
      .then((response: AxiosResponse<LoginResponse>) => {
        this.$store.dispatch("login", {
          token: response.data.token,
          userid: response.data.userId
        });
        this.$router.push("orders");
        this.$emit("success");
      })
      .catch((res: AxiosError) => {
        this.isShowing = true;
        this.signin.username = "";
        this.signin.password = "";
        this.error = res.response && res.response.data.error;
      });
  }
}

interface LoginResponse {
  token: string;
  userId: number;
}

export interface LoginForm {
  username: string;
  password: string;
}
</script>

<style scoped>
.center {
  text-align: center;
}

.input {
  width: 250px;
}
</style>
