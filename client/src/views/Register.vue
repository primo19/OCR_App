<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4" lg="4">
      <v-card class="my-12 elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title class="nav">
            <router-link to="/" v-html="loginLabel"></router-link>|
            <router-link to="/register">Register</router-link>
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <div class="error" v-html="error"></div>
            <v-text-field label="Email" name="email" type="email" v-model="email" />
            <v-text-field label="Password" name="password" type="password" v-model="password" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn class="indigo darken-4" @click="register" dark>Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
export default {
  data() {
    return {
      email: "",
      password: "",
      // Just to bypas ESLint no-irregular-whitespace
      loginLabel: "Login ",
      error: null
    };
  },
  methods: {
    async register() {
      try {
        const response = await AuthenticationService.register({
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
.error {
  color: white;
  background-color: transparent;
}
.nav a {
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav a.router-link-exact-active {
  color: #2ebf91;
}
</style>