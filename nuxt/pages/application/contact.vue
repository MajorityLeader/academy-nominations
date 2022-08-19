<template>
  <div>
    <v-form ref="form" @submit.prevent="submitForm">
      <v-container>
        <Stepper :step="2"></Stepper>

        <v-card class="mb-10">
          <v-card-title>
            <v-avatar color="primary" class="mr-5" dark size="20">
              <span class="white--text body-2">1</span>
            </v-avatar>Legal Address in Maryland
          </v-card-title>
          <v-card-text class="px-15 pb-5">
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="form.street" :rules="[rules.required()]" label="Street*" name="required-street">
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="form.city" :rules="[rules.required()]" validate-on-blur label="City*"
                  name="required-city"></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field v-model="form.state" :rules="[rules.required(), rules.exactLength('State', 2)]"
                  validate-on-blur label="State*" name="required-state"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="form.zip" :counter="5"
                  :rules="[rules.required(), rules.exactLength('Zipcode', 5)]" validate-on-blur label="Zipcode*"
                  name="required-zip"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="form.phone" :rules="[rules.required()]" validate-on-blur label="Phone*"
                  name="required-phone"></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card class="mb-10">
          <v-card-title>
            <v-avatar color="primary" class="mr-5" dark size="20">
              <span class="white--text body-2">2</span>
            </v-avatar>Temporary Address If Applicable (PREP SCHOOL, etc)
          </v-card-title>
          <v-card-text class="px-15 pb-5">
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="form.tempStreet" label="Street" name="temp-street"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="form.tempCity" validate-on-blur label="City" name="temp-city"></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field v-model="form.tempState" validate-on-blur label="State" name="temp-state"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="form.tempZipcode" :counter="5" validate-on-blur label="Zipcode"
                  name="temp-zipcode"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="form.tempPhone" validate-on-blur label="Phone" name="temp-phone"></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="form.tempDate" validate-on-blur label="Address Valid Until" name="temp-enddate">
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
import dayjs from 'dayjs'
export default {
  data() {
    return {
      dobMenu: false,
      valid: false,
      loading: false,
      error: {
        status: false,
        message: null
      },
      form: {
        street: null,
        city: null,
        state: null,
        zip: null,
        phone: null,
        tempStreet: null,
        tempCity: null,
        tempState: null,
        tempZip: null,
        tempPhone: null,
        tempDate: null
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
    try {
      const data = await this.$axios.$get(
        `/api/contact/${this.$route.query.a}`
      )
      if (!data) return;
      data.tempDate = data.tempDate
        ? dayjs(data.tempDate).format('MM-DD-YYYY')
        : null
      this.form = data
    } catch (e) {
      if (e.response && e.response.status === 404) {
        // Do nothing and use form default values
        console.clear()
      } else {
        console.error(e.response)
      }
    }
  },
  methods: {
    async back() {
      this.$router.replace(`/application/personal?a=${this.$route.query.a}`)
    },
    async save() {
      await this.$axios.$patch(
        `/api/contact/${this.$route.query.a}`,
        this.form
      )
    },
    async submitForm() {
      await this.$axios.$patch(
        `/api/contact/${this.$route.query.a}`,
        this.form
      )
      this.$router.push(`/application/education?a=${this.$route.query.a}`)
    }
  }
}
</script>
