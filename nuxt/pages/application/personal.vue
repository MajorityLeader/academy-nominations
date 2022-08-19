<template>
  <div>
    <v-form ref="form" @submit.prevent="submitForm">
      <v-container>
        <Stepper :step="1"></Stepper>
        <v-card class="mb-10">
          <v-card-title>
            <v-avatar color="primary" class="mr-5" dark size="20">
              <span class="white--text body-2">1</span>
            </v-avatar>Personal Information
          </v-card-title>
          <v-card-text class="px-15 pb-5">
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field v-model="form.firstName" :rules="[rules.required()]" label="First Name*"
                  name="required-FIRSTNAME"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="form.middleName" label="Middle Name" name="MIDDLENAME"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="form.lastName" :rules="[rules.required()]" label="Last Name*"
                  name="required-LASTNAME"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-menu ref="dobMenu" v-model="dobMenu" :close-on-content-click="false" transition="scale-transition"
                  offset-y min-width="290px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="form.birthDate" label="Birthday date*" readonly v-bind="attrs"
                      :rules="[rules.required()]" name="required-dob" v-on="on">
                    </v-text-field>
                  </template>
                  <v-date-picker ref="picker" v-model="form.birthDate" :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field v-model="form.birthPlace" label="Place of Birth*"
                  :rules="[rules.required('Place of Birth')]" name="required-pob"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="form.fatherName" label="Father's Name" name="father-name"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="form.fatherOccupation" label="Father's Occupation" name="father-occupation">
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="form.motherName" label="Mother's Name" name="mother-name"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="form.motherOccupation" label="Mother's Occupation" name="mother-occupation">
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
        firstName: null,
        middleName: null,
        lastName: null,
        birthDate: null,
        birthPlace: null,
        fatherName: null,
        fatherOccupation: null,
        motherName: null,
        motherOccupation: null,
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
        `/api/personal/${this.$route.query.a}`
      )
      if (!data) return
      data.birthDate = data.birthDate
        ? dayjs(data.birthDate).format('MM-DD-YYYY')
        : null
      this.form = data
    } catch (e) {
      if (e.response.status === 404) {
        // Do nothing and use form default values
        console.clear()
      } else {
        console.error(e.response)
      }
    }
  },
  methods: {
    async save() {
      await this.$axios.$patch(
        `/api/personal/${this.$route.query.a}`,
        this.form
      )
    },
    async submitForm() {
      await this.$axios.$patch(
        `/api/personal/${this.$route.query.a}`,
        this.form
      )
      this.$router.push(`/application/contact?a=${this.$route.query.a}`)
    }
  }
}
</script>
