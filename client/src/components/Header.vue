<template>
  <v-toolbar fixed dark color="primary">
    <v-toolbar-title class="mr-4">OCR App</v-toolbar-title>
    <v-toolbar-items>
      <v-btn dark text class="indigo darken-4">Library</v-btn>
    </v-toolbar-items>
    <v-spacer />
    <v-toolbar-items v-if="$store.state.isUserLoggedIn">
      <v-btn text dark class="indigo darken-4">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {};
</script>

<style>
</style>