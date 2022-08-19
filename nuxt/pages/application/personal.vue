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
                      :rules="[rules.required()]" name="required-dob" v-on="on"></v-text-field>
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

        <v-card class="mb-10">
          <v-card-title>
            <v-avatar color="primary" class="mr-5" dark size="20">
              <span class="white--text body-2">2</span>
            </v-avatar>Legal Address in Maryland
          </v-card-title>
          <v-card-text class="px-15 pb-5">
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="form.addressStreet" :rules="[rules.required()]" label="Street*"
                  name="required-street"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="form.addressCity" :rules="[rules.required()]" validate-on-blur label="City*"
                  name="required-city"></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field v-model="form.addressState" :rules="[rules.required(), rules.exactLength('State', 2)]"
                  validate-on-blur label="State*" name="required-state"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="form.addressZipcode" :counter="5"
                  :rules="[rules.required(), rules.exactLength('Zipcode', 5)]" validate-on-blur label="Zipcode*"
                  name="required-zipcode"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="form.addressPhone" :rules="[rules.required()]" validate-on-blur label="Phone*"
                  name="required-phone"></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card class="mb-10">
          <v-card-title>
            <v-avatar color="primary" class="mr-5" dark size="20">
              <span class="white--text body-2">3</span>
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
                <v-text-field v-model="form.tempValidUntil" validate-on-blur label="Address Valid Until"
                  name="temp-enddate"></v-text-field>
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
export default ({
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
        addressStreet: null,
        addressCity: null,
        addressState: null,
        addressZip: null,
        addressPhone: null,
        tempStreet: null,
        tempCity: null,
        tempState: null,
        tempZip: null,
        tempPhone: null,
        tempValidUntil: null
      },
      rules: {
        required: () => {
          return (v) => !!v || `This is required`
        },
        exactLength: (field, length) => {
          return (v) =>
            (v && v.length === length) ||
            `${field} must be exactly ${length} characters`
        },
      },
    }
  },
  async mounted() {
    console.log('fetched')
    const data = await this.$axios.$get(`/api/applications/${this.$route.query.a}`);
    data.birthDate = data.birthDate ? dayjs(data.birthDate).format('MM-DD-YYYY') : null
    data.tempValidUntil = data.tempValidUntil ? dayjs(data.tempValidUntil).format('MM-DD-YYYY') : null
    this.form = data
  },
  methods: {
    async back() {
      await this.$axios.$patch(`/api/applications/personal/${this.$route.query.a}`, this.form)
      this.$router.replace(`/application?a=${this.$route.query.a}`)
    },
    async save() {
      await this.$axios.$patch(`/api/applications/personal/${this.$route.query.a}`, this.form)
    },
    async submitForm() {
      await this.$axios.$patch(`/api/applications/personal/${this.$route.query.a}`, this.form)
      this.$router.push(`/application/education?a=${this.$route.query.a}`)
    }
  }
})
</script>
