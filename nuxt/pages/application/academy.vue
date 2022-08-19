<template>
  <div>
    <v-form ref="form" @submit.prevent="submitForm">
      <v-container>
        <Stepper :step="3"></Stepper>
        <v-card class="mb-10">
          <v-card-title>
            <v-avatar color="primary" class="mr-5" dark size="20">
              <span class="white--text body-2">1</span>
            </v-avatar>Academy Selection
          </v-card-title>
          <v-card-text class="px-15 pb-5">
            <p>
              Please number the Academies in order of preference. Remember that
              you must open a candidate file with each Academy that you
              select.<br />
              BY SELECTING A SECOND AND/OR THIRD CHOICE, YOU ARE INDICATING YOU
              WOULD ALSO ACCEPT A NOMINATION TO THAT ACADEMY.
            </p>
            <v-row>
              <v-col cols="12" md="3">
                <v-select v-model="form.academySelectFirst" label="First Choice*" name="academy-selection-first"
                  :rules="[rules.required()]" :items="[
                    'US Air Force Academy',
                    'US Military Academy',
                    'US Merchant Marine Academy',
                    'US Naval Academy',
                  ]"></v-select>
              </v-col>
              <v-col cols="12" md="3">
                <v-select v-model="form.academySelectSecond" label="Second Choice" name="academy-selection-second"
                  :items="[
                    'US Air Force Academy',
                    'US Military Academy',
                    'US Merchant Marine Academy',
                    'US Naval Academy',
                  ]"></v-select>
              </v-col>
              <v-col cols="12" md="3">
                <v-select v-model="form.academySelectThird" label="Third Choice" name="academy-selection-third" :items="[
                  'US Air Force Academy',
                  'US Military Academy',
                  'US Merchant Marine Academy',
                  'US Naval Academy',
                ]"></v-select>
              </v-col>
              <v-col cols="12" md="3">
                <v-select v-model="form.aacademySelectFourth" label="Fourth Choice" name="academy-selection-fourth"
                  :items="[
                    'US Air Force Academy',
                    'US Military Academy',
                    'US Merchant Marine Academy',
                    'US Naval Academy',
                  ]"></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="form.academySelectionElsewhere" name="academy-selection-elsewhere"
                  label="I am also seeking a nomination through">
                </v-text-field>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field v-model="form.academySelectionPreviousElsewhere"
                  name="academy-selection-previous-elsewhere" label="I have previously sought a nomination through">
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="form.academySelectionPreviouslyWhen" label="When"
                  name="academy-selection-elsewhere-when">
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card transparent flat elevation="0">
          <v-card-text>
            <v-alert v-if="error.status" type="error">
              There was an error submitting the form. {{ message }}
            </v-alert>
          </v-card-text>

          <v-card-actions>
            <v-btn @click="back" large outlined color="primary">Back</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="save" large outlined color="primary">Save</v-btn>
            <v-btn id="submitButton" type="submit" :loading="loading" large class="primary">Next</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      head: {
        title: 'Academy selection'
      },
      dobMenu: false,
      valid: false,
      loading: false,
      error: {
        status: false,
        message: null
      },
      form: {
        academySelectFirst: null,
        academySelectSecond: null,
        academySelectThird: null,
        academySelectFourth: null,
        academySelectionElsewhere: null,
        academySelectionPreviousElsewhere: null,
        academySelectionPreviouslyWhen: null
      },
      rules: {
        required: () => {
          return (v) => !!v || `This is required`
        },
        exactLength: (field, length) => {
          return (v) =>
            (v && v.length === length) ||
            `${field} must be exactly ${length} characters`
        }
      }
    }
  },
  async mounted() {
    console.log('fetched')
    const data = await this.$axios.$get(
      `/api/applications/${this.$route.query.a}`
    )
    this.form = data
  },
  methods: {
    async back() {
      this.$router.replace(`/application/education?a=${this.$route.query.a}`)
    },
    async save() {
      await this.$axios.$patch(
        `/api/applications/academy/${this.$route.query.a}`,
        this.form
      )
    },
    async submitForm() {
      await this.$axios.$patch(
        `/api/applications/academy/${this.$route.query.a}`,
        this.form
      )
      this.$router.push(`/application/documents?a=${this.$route.query.a}`)
    }
  }
}
</script>
