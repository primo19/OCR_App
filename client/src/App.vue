<template>
  <div id="app">
    <v-app>
      <v-content>
        <PageHeader />
        <v-container fluid>
          <router-view />
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import PageHeader from "@/components/Header.vue";
export default {
  components: {
    PageHeader
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: linear-gradient(to bottom, #86a8e7, #91eae4);
  height: 100%;
}
</style>
