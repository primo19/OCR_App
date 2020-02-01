<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4" lg="4">
      <form @submit.prevent="handleSubmit" method="POST" enctype="multipart/form-data">
        <v-card class="my-12 elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Optical Character Reader</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <!-- <v-file-input
            accept="image/*"
            show-size
            label="File input"
            name="file"
            ref="file"
            @change="selectImage"
            ></v-file-input>-->

            <input type="file" ref="file" name="file" @change="selectImage" />
            <!-- <button type="submit">Upload</button> -->
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn class="indigo darken-4" dark type="submit">Convert</v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-col>
  </v-row>
</template>

<script>
import ConversionService from "@/services/ConversionService";
export default {
  data() {
    return {
      imageFile: null
    };
  },
  methods: {
    selectImage() {
      const file = this.$refs.file.files[0];
      this.imageFile = file;
    },
    async handleSubmit() {
      const formData = new FormData();
      formData.append("file", this.imageFile);

      try {
        await ConversionService.sendimage(formData);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>
</style>