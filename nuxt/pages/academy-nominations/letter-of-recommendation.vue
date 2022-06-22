<template>
  <v-container>
    <h1 class="mt-00 mb-15 text-center" style="font-family: serif">
      US Service Academy Nomination<br />Letter of Recommendation Submission
      Form
    </h1>
    <v-row>
      <v-col cols="12">
        <v-card outlined class="mb-10">
          <v-card-title
            ><v-avatar color="primary" class="mr-5" dark size="20"
              ><span class="white--text body-2">1</span></v-avatar
            >Unique applicant code</v-card-title
          >
          <v-card-text class="px-15 pb-5">
            <p>
              This code associates your file upload with the correct applicant.
            </p>
            <v-text-field
              v-model="code"
              placeholder="UA-XXXX-XXXXXXX"
              outlined
            ></v-text-field>
            <v-alert
              v-if="code && code.length >= 7"
              border="top"
              dense
              text
              type="info"
              elevation="0"
            >
              The uploaded file will be submitted the office of Rep. Steny H.
              Hoyer [D-MD-5]
            </v-alert>
          </v-card-text>
        </v-card>
        <v-card outlined>
          <v-card-title
            ><v-avatar color="primary" class="mr-5" dark size="20"
              ><span class="white--text body-2">2</span></v-avatar
            >Letter of recommendation</v-card-title
          >
          <v-card-text class="px-15 pb-5">
            <v-file-input
              v-model="file"
              single-line
              outlined
              hint="PDF or DOCX | 5 MB"
              persistent-hint
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" elevation="0" :disabled="!code && !file"
              >Upload Letter of Recommendation</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      code: undefined,
      file: undefined,
    }
  },
}
</script>

<style scoped>
.container {
  max-width: 840px;
}
</style>

<style>
.v-btn {
  text-transform: inherit;
  letter-spacing: 0.3px;
}
</style>