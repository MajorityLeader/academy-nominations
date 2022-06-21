<template>
<div>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
        <h1>US Service Academy Nominations</h1>
        <h2>Honorable Steny H. Hoyer (MD-05)</h2>
    </v-col>
  </v-row>
  <v-container>
  <v-row>
    <v-col cols="12">
        <v-stepper v-model="state.e6" vertical>
    <v-stepper-step :complete="state.e6 > 1" step="1">
      Required Confirmations
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
      <v-btn color="primary" @click="state.e6 = 2"> Continue </v-btn>
      <v-btn text> Cancel </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="state.e6 > 2" step="2">
      Personal Information
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
      <v-btn color="primary" @click="state.e6 = 3"> Continue </v-btn>
      <v-btn text> Cancel </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="state.e6 > 3" step="3">
      Legal Address in Maryland
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
      <v-btn color="primary" @click="state.e6 = 4"> Continue </v-btn>
      <v-btn text> Cancel </v-btn>
    </v-stepper-content>

    <v-stepper-step step="4"> Education & Employment History </v-stepper-step>
    <v-stepper-content step="4">
      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
      <v-btn color="primary" @click="state.e6 = 5"> Continue </v-btn>
      <v-btn text> Cancel </v-btn>
    </v-stepper-content>
    <v-stepper-step step="5"> Academy Selection </v-stepper-step>
    <v-stepper-step step="6"> Letters of Recommendation </v-stepper-step>
    <v-stepper-step step="7"> Document Uploads </v-stepper-step>
  </v-stepper>
    </v-col>
  </v-row>
  </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      state: {
        e6: 1
      }
    }
  },
  head() {
    return {
      title: 'US Service Academy Nominations'
    }
  }
})
</script>


