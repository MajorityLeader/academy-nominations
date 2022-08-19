<template>
  <v-stepper alt-labels class="mb-10" :value="step">
    <v-stepper-header>
      <v-stepper-step step="1" :complete="step > 1">
        Personal
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="2" :complete="step > 2">
        Contact
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3" :complete="step > 3">
        Education
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="4" :complete="step > 4">
        Academies Selection
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="5" :complete="step > 5">
        Documents
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="6" :complete="step > 6">
        Referrals
      </v-stepper-step>
    </v-stepper-header>
  </v-stepper>
</template>

<script>
export default ({
  props: {
    step: {
      default: 1
    }
  }
})
</script>

<style>
.v-application--is-ltr .v-stepper__label {
  text-align: center
}
</style>