<template>
  <div class="login">
    <Header/>
    <div class="center">
      <h2 class="title is-2">Employee Login</h2>
      <h4 class="title is-4" style="color: red">**Not for Customers**</h4>

      <div style="margin-bottom: 5px">
        <input class="input" type="text" placeholder="Username">
      </div>
      <div>
        <input class="input" type="password" placeholder="Password">
      </div>
      <br>
      <button class="button">
        <router-link to="/orders" exact-active-class="is-active">Login</router-link>
      </button>
    </div>
    <Footer/>
  </div>
</template>

<script lang="ts">
import axios, { AxiosError, AxiosResponse } from "axios";
import { APIConfig } from "../utils/api.utils";
import { Component, Vue } from "vue-property-decorator";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";

@Component({
  components: {
    Header,
    Footer
  }
})
export default class Login extends Vue {
  signup: LoginForm = {
    username: "",
    password: ""
  };

  error: string | boolean = false;

  success() {
    this.error = false;
    axios
      .post(APIConfig.buildUrl("/login"), {
        emailAddress: this.signup.username,
        password: this.signup.password
      })
      .then((response: AxiosResponse<LoginResponse>) => {
        this.$store.dispatch("login", {
          token: response.data.token,
          userid: response.data.userId
        });
        this.$emit("success");
      })
      .catch((res: AxiosError) => {
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
