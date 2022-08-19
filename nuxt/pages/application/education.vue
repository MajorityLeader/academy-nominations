<template>
  <div>
    <v-form ref="form" @submit.prevent="submitForm">
      <v-container>
        <Stepper :step="2"></Stepper>
        <v-card class="mb-10">
          <v-card-title>
            <v-avatar color="primary" class="mr-5" dark size="20">
              <span class="white--text body-2">1</span>
            </v-avatar>Education & Employment
          </v-card-title>
          <v-card-text class="px-15 pb-5">
            <v-row>
              <v-col cols="12" md="9">
                <v-text-field v-model="form.highSchool" :rules="[rules.required()]" label="High School*"
                  name="required-highschool-location"></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field v-model="form.yearOfGraduation" :rules="[
                  rules.required(),
                  rules.exactLength('High School Graduation Year', 4),
                ]" label="Year of Graduation*" name="required-highschool-graduation"></v-text-field>
              </v-col>
              <v-col cols="12" md="9">
                <v-text-field v-model="form.college" label="College (if any)" name="college-location"></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field v-model="form.yearsCompleted" label="Years Completed" type="number"
                  name="college-yearsattended"></v-text-field>
              </v-col>
              <v-col cols="12">Indicate any extra curricular activities you participated
                in.</v-col>
              <v-col cols="4">
                <v-checkbox v-model="
                  form.extraActivitiesDescription
                " value="Boys' State/Boys' Nation" label="Boys' State/Boys' Nation" name="extra-clubs"></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox v-model="
                  form.extraActivitiesDescription
                " value="Girls' State/Girls' Nation" label="Girls' State/Girls' Nation" name="extra-clubs">
                </v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox v-model="
                  form.extraActivitiesDescription
                " value="President of Student Gov't" label="President of Student Gov't" name="extra-clubs">
                </v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox v-model="
                  form.extraActivitiesDescription
                " value="Other student Gov't office" label="Other student Gov't office" name="extra-clubs">
                </v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox v-model="
                  form.extraActivitiesDescription
                " value="Key Club" label="Key Club" name="extra-clubs"></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox v-model="
                  form.extraActivitiesDescription
                " value="Service Club" label="Service Club" name="extra-clubs"></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox v-model="
                  form.extraActivitiesDescription
                " value="Eagle Scout" label="Eagle Scout" name="extra-clubs"></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox v-model="
                  form.extraActivitiesDescription
                " value="Girl Scout" label="Girl Scout" name="extra-clubs"></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox v-model="
                  form.extraActivitiesDescription
                " value="Boy Scout" label="Boy Scout" name="extra-clubs"></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox v-model="
                  form.extraActivitiesDescription
                " value="President of Class" label="President of Class" name="extra-clubs"></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox v-model="
                  form.extraActivitiesDescription
                " value="Science Club" label="Science Club" name="extra-clubs"></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox v-model="
                  form.extraActivitiesDescription
                " value="Student Council Member" label="Student Council Member" name="extra-clubs"></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox v-model="
                  form.extraActivitiesDescription
                " value="National Honor Society" label="National Honor Society" name="extra-clubs"></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox v-model="
                  form.extraActivitiesDescription
                " value="School Band/Chorus" label="School Band/Chorus" name="extra-clubs"></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox v-model="
                  form.extraActivitiesDescription
                " value="Yearbook/Newspaper Editor" label="Yearbook/Newspaper Editor" name="extra-clubs">
                </v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox v-model="
                  form.extraActivitiesDescription
                " value="Community Award" label="Community Award" name="extra-clubs"></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox v-model="
                  form.extraActivitiesDescription
                " value="Club Officer" label="Club Officer" name="extra-clubs"></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox v-model="
                  form.extraActivitiesDescription
                " value="Junior ROTC" label="Junior ROTC" name="extra-clubs"></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox v-model="
                  form.extraActivitiesDescription
                " value="Other" label="Other" name="extra-clubs"></v-checkbox>
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="
                  form.extraCurricularActivities
                " filled name="extra-clubs-info"
                  label="Provide additional information for activities indicated above"
                  placeholder="List the grade(s) for each activity you selected above. Please indicate if you hold a leadership role in any of the activities you list."
                  hint="List the grade(s) for each activity you selected above. Please indicate if you hold a leadership role in any of the activities you list.">
                </v-textarea>
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="
                  form.athleticDescription
                " filled name="extra-clubs-sports" label="List any athletic participation"
                  placeholder="For each, include the sport, whether you were varsity/JV, position, awards, letters, and grades."
                  hint="For each, include the sport, whether you were varsity/JV, position, awards, letters, and grades.">
                </v-textarea>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="form.employedWhere" name="employment-where" label="If employed, where">
                </v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field v-model="
                  form.employedHoursAfterSchool
                " name="employment-hours-afterschool" label="How many hours per week after school" type="number">
                </v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field v-model="
                  form.employedHoursDuringSummer
                " label="How many hours per week during summer" type="number" name="employment-hours-afterschool">
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
        highSchool: null,
        yearOfGraduation: null,
        college: null,
        yearsCompleted: null,
        extraCurricularActivities: null,
        extraActivitiesDescription: null,
        athleticDescription: null,
        employedWhere: null,
        employedHoursAfterSchool: null,
        employedHoursDuringSummer: null
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
      this.$router.replace(`/application/personal?a=${this.$route.query.a}`)
    },
    async save() {
      await this.$axios.$patch(`/api/applications/education/${this.$route.query.a}`, this.form)
    },
    async submitForm() {
      await this.$axios.$patch(`/api/applications/education/${this.$route.query.a}`, this.form)
      this.$router.push(`/application/documents?a=${this.$route.query.a}`)
    }
  }
})
</script>
