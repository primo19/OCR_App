<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4" lg="4">
      <v-card class="my-12 elevation-12">
        <v-toolbar color="primary" dark text>
          <v-toolbar-title class="nav">
            <router-link to="/" v-html="loginLabel"></router-link>|
            <router-link to="/register">Register</router-link>
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field label="Email" name="email" type="email" v-model="email" />
            <v-text-field label="Password" name="password" type="password" v-model="password" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn class="indigo darken-4" dark @click="login">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import AuthenticationService from "@/services/AuthenticationService";
export default {
  name: "login",
  data() {
    return {
      // Just to bypas ESLint no-irregular-whitespace
      loginLabel: "Login ",
      email: "",
      password: "",
      error: null
    };
  },
  components: {},
  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        });
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
      } catch (e) {
        this.error = e.response.data.error;
      } finally {
        // finally code always runs
      }
    }
  }
};
</script>

<style scoped>
.nav a {
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav a.router-link-exact-active {
  color: #2ebf91;
}
</style>
