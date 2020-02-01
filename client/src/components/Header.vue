<template>
  <v-toolbar fixed dark color="primary">
    <v-toolbar-title class="mr-4">OCR App</v-toolbar-title>
    <v-toolbar-items v-if="$store.state.isUserLoggedIn">
      <v-btn dark text class="indigo darken-4" router to="library">Library</v-btn>
      <v-btn dark text class="indigo darken-4" router to="convert">Convert</v-btn>
    </v-toolbar-items>
    <v-spacer />
    <v-toolbar-items v-if="$store.state.isUserLoggedIn">
      <v-btn text dark class="indigo darken-4" @click="logout">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "login"
      });
    }
  }
};
</script>

<style>
</style>