<template>
  <v-app id="inspire">
    <v-form
      ref="form"
      v-model="valid"
      autocomplete="on"
      enctype="multipart/form-data"
      action="http://localhost:3000/applications"
      method="post"
      @submit.prevent="formSubmit"
    >
      <v-container>
        <v-subheader>Fields marked with * are required.</v-subheader>
        <v-card outlined class="mb-10">
          <v-card-title>
            <v-avatar color="primary" class="mr-5" dark size="20">
              <span class="white--text body-2">1</span> </v-avatar
            >Required Confirmations
          </v-card-title>
          <v-card-text class="px-15 pb-5">
            <div>Before starting your application, please confirm that:</div>
            <v-row>
              <v-col cols="12">
                <v-checkbox :rules="[rules.required()]">
                  <template v-slot:label>
                    <div>
                      I have read the Information Sheet on the
                      <a
                        target="_blank"
                        href="/help/nominations-faq"
                        @click.stop
                        >FAQ page</a
                      >
                      explaining the nominating procedure and am familiar with
                      the requirements.*
                    </div>
                  </template>
                </v-checkbox>
                <v-checkbox
                  :rules="[rules.required()]"
                  label="I certify that I am a legal resident of the fifth congressional district of Maryland.*"
                ></v-checkbox>
                <v-checkbox :rules="[rules.required()]">
                  <template v-slot:label>
                    <div>
                      I understand that, if my application packet is not
                      postmarked by the deadline posted above, I will not be
                      scheduled for an interview and given final consideration
                      for a nomination.*
                    </div>
                  </template>
                </v-checkbox>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="1">
                <v-radio-group
                  v-model="form.permission.media"
                  :mandatory="true"
                >
                  <v-radio
                    label="Yes"
                    :value="true"
                    name="permission-media"
                  ></v-radio>
                  <v-radio
                    label="No"
                    :value="false"
                    name="permission-media"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col>
                <p class="mt-5" style="color: rgba(0, 0, 0, 0.6)">
                  I hereby give permission to Congressman Hoyer's office to
                  provide my name to any local media who may be interested in
                  contacting me upon the publication of my name in local
                  newspapers if I receive a nomination and/or appointment to a
                  U.S. Service Academy
                </p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card class="mb-10">
          <v-card-title
            ><v-avatar color="primary" class="mr-5" dark size="20">
              <span class="white--text body-2">2</span> </v-avatar
            >Personal Information</v-card-title
          >
          <v-card-text class="px-15 pb-5">
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.personal.firstName"
                  :rules="[rules.required()]"
                  label="First Name*"
                  name="required-FIRSTNAME"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.personal.middleName"
                  label="Middle Name"
                  name="MIDDLENAME"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.personal.lastName"
                  :rules="[rules.required()]"
                  label="Last Name*"
                  name="required-LASTNAME"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="form.personal.email"
                  label="Email*"
                  :rules="[rules.required(), rules.email()]"
                  validate-on-blur
                  name="required-email"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-menu
                  ref="dobMenu"
                  v-model="dobMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.personal.birth.date"
                      label="Birthday date*"
                      readonly
                      v-bind="attrs"
                      :rules="[rules.required()]"
                      name="required-dob"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="form.personal.birth.date"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field
                  v-model="form.personal.birth.place"
                  label="Place of Birth*"
                  :rules="[rules.required('Place of Birth')]"
                  name="required-pob"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.personal.parents.father.name"
                  label="Father's Name"
                  name="father-name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.personal.parents.father.occupation"
                  label="Father's Occupation"
                  name="father-occupation"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.personal.parents.mother.name"
                  label="Mother's Name"
                  name="mother-name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.personal.parents.mother.occupation"
                  label="Mother's Occupation"
                  name="mother-occupation"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card class="mb-10">
          <v-card-title
            ><v-avatar color="primary" class="mr-5" dark size="20">
              <span class="white--text body-2">3</span> </v-avatar
            >Legal Address in Maryland</v-card-title
          >
          <v-card-text class="px-15 pb-5">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.legalAddress.street"
                  :rules="[rules.required()]"
                  label="Street*"
                  name="required-street"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.legalAddress.city"
                  :rules="[rules.required()]"
                  validate-on-blur
                  label="City*"
                  name="required-city"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field
                  v-model="form.legalAddress.state"
                  :rules="[rules.required(), rules.exactLength('State', 2)]"
                  validate-on-blur
                  label="State*"
                  name="required-state"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.legalAddress.zipcode"
                  :counter="5"
                  :rules="[rules.required(), rules.exactLength('Zipcode', 5)]"
                  validate-on-blur
                  label="Zipcode*"
                  name="required-zipcode"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="form.legalAddress.phone"
                  :rules="[rules.required()]"
                  validate-on-blur
                  label="Phone*"
                  name="required-phone"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card class="mb-10">
          <v-card-title
            ><v-avatar color="primary" class="mr-5" dark size="20">
              <span class="white--text body-2">4</span> </v-avatar
            >Temporary Address If Applicable (PREP SCHOOL, etc)</v-card-title
          >
          <v-card-text class="px-15 pb-5">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.temporaryAddress.street"
                  label="Street"
                  name="temp-street"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.temporaryAddress.city"
                  validate-on-blur
                  label="City"
                  name="temp-city"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field
                  v-model="form.temporaryAddress.state"
                  validate-on-blur
                  label="State"
                  name="temp-state"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.temporaryAddress.zipcode"
                  :counter="5"
                  validate-on-blur
                  label="Zipcode"
                  name="temp-zipcode"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="form.temporaryAddress.phone"
                  validate-on-blur
                  label="Phone"
                  name="temp-phone"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="form.temporaryAddress.endDate"
                  validate-on-blur
                  label="Address Valid Until"
                  name="temp-enddate"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card class="mb-10">
          <v-card-title
            ><v-avatar color="primary" class="mr-5" dark size="20">
              <span class="white--text body-2">5</span> </v-avatar
            >Education & Employment</v-card-title
          >
          <v-card-text class="px-15 pb-5">
            <v-row>
              <v-col cols="12" md="9">
                <v-text-field
                  v-model="form.educationEmployment.highSchool.location"
                  :rules="[rules.required()]"
                  label="High School*"
                  name="required-highschool-location"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="form.educationEmployment.highSchool.graduation"
                  :rules="[
                    rules.required(),
                    rules.exactLength('High School Graduation Year', 4),
                  ]"
                  label="Year of Graduation*"
                  name="required-highschool-graduation"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="9">
                <v-text-field
                  v-model="form.educationEmployment.college.location"
                  label="College (if any)"
                  name="college-location"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="form.educationEmployment.college.yearsAttended"
                  label="Years Completed"
                  type="number"
                  name="college-yearsattended"
                ></v-text-field>
              </v-col>
              <v-col cols="12"
                >Indicate any extra curricular activities you participated
                in.</v-col
              >
              <v-col cols="4">
                <v-checkbox
                  v-model="
                    form.educationEmployment.extraCurricularActivities.clubs
                  "
                  value="Boys' State/Boys' Nation"
                  label="Boys' State/Boys' Nation"
                  name="extra-clubs"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="
                    form.educationEmployment.extraCurricularActivities.clubs
                  "
                  value="Girls' State/Girls' Nation"
                  label="Girls' State/Girls' Nation"
                  name="extra-clubs"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="
                    form.educationEmployment.extraCurricularActivities.clubs
                  "
                  value="President of Student Gov't"
                  label="President of Student Gov't"
                  name="extra-clubs"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="
                    form.educationEmployment.extraCurricularActivities.clubs
                  "
                  value="Other student Gov't office"
                  label="Other student Gov't office"
                  name="extra-clubs"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="
                    form.educationEmployment.extraCurricularActivities.clubs
                  "
                  value="Key Club"
                  label="Key Club"
                  name="extra-clubs"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="
                    form.educationEmployment.extraCurricularActivities.clubs
                  "
                  value="Service Club"
                  label="Service Club"
                  name="extra-clubs"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="
                    form.educationEmployment.extraCurricularActivities.clubs
                  "
                  value="Eagle Scout"
                  label="Eagle Scout"
                  name="extra-clubs"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="
                    form.educationEmployment.extraCurricularActivities.clubs
                  "
                  value="Girl Scout"
                  label="Girl Scout"
                  name="extra-clubs"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="
                    form.educationEmployment.extraCurricularActivities.clubs
                  "
                  value="Boy Scout"
                  label="Boy Scout"
                  name="extra-clubs"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="
                    form.educationEmployment.extraCurricularActivities.clubs
                  "
                  value="President of Class"
                  label="President of Class"
                  name="extra-clubs"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="
                    form.educationEmployment.extraCurricularActivities.clubs
                  "
                  value="Science Club"
                  label="Science Club"
                  name="extra-clubs"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="
                    form.educationEmployment.extraCurricularActivities.clubs
                  "
                  value="Student Council Member"
                  label="Student Council Member"
                  name="extra-clubs"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="
                    form.educationEmployment.extraCurricularActivities.clubs
                  "
                  value="National Honor Society"
                  label="National Honor Society"
                  name="extra-clubs"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="
                    form.educationEmployment.extraCurricularActivities.clubs
                  "
                  value="School Band/Chorus"
                  label="School Band/Chorus"
                  name="extra-clubs"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="
                    form.educationEmployment.extraCurricularActivities.clubs
                  "
                  value="Yearbook/Newspaper Editor"
                  label="Yearbook/Newspaper Editor"
                  name="extra-clubs"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="
                    form.educationEmployment.extraCurricularActivities.clubs
                  "
                  value="Community Award"
                  label="Community Award"
                  name="extra-clubs"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="
                    form.educationEmployment.extraCurricularActivities.clubs
                  "
                  value="Club Officer"
                  label="Club Officer"
                  name="extra-clubs"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="
                    form.educationEmployment.extraCurricularActivities.clubs
                  "
                  value="Junior ROTC"
                  label="Junior ROTC"
                  name="extra-clubs"
                ></v-checkbox>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  v-model="
                    form.educationEmployment.extraCurricularActivities.clubs
                  "
                  value="Other"
                  label="Other"
                  name="extra-clubs"
                ></v-checkbox>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="
                    form.educationEmployment.extraCurricularActivities
                      .additionalInfo
                  "
                  filled
                  name="extra-clubs-info"
                  label="Provide additional information for activities indicated above"
                  placeholder="List the grade(s) for each activity you selected above. Please indicate if you hold a leadership role in any of the activities you list."
                  hint="List the grade(s) for each activity you selected above. Please indicate if you hold a leadership role in any of the activities you list."
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="
                    form.educationEmployment.extraCurricularActivities
                      .athleticParticipation
                  "
                  filled
                  name="extra-clubs-sports"
                  label="List any athletic participation"
                  placeholder="For each, include the sport, whether you were varsity/JV, position, awards, letters, and grades."
                  hint="For each, include the sport, whether you were varsity/JV, position, awards, letters, and grades."
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.educationEmployment.employment.where"
                  name="employment-where"
                  label="If employed, where"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="
                    form.educationEmployment.employment.hoursPerWeek.afterSchool
                  "
                  name="employment-hours-afterschool"
                  label="How many hours per week after school"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="
                    form.educationEmployment.employment.hoursPerWeek.summer
                  "
                  label="How many hours per week during summer"
                  type="number"
                  name="employment-hours-afterschool"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card class="mb-10">
          <v-card-title
            ><v-avatar color="primary" class="mr-5" dark size="20">
              <span class="white--text body-2">6</span> </v-avatar
            >Academy Selection</v-card-title
          >
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
                <v-select
                  v-model="form.academySelection.first"
                  label="First Choice*"
                  name="academy-selection-first"
                  :rules="[rules.required()]"
                  :items="[
                    'US Air Force Academy',
                    'US Military Academy',
                    'US Merchant Marine Academy',
                    'US Naval Academy',
                  ]"
                ></v-select>
              </v-col>
              <v-col cols="12" md="3">
                <v-select
                  v-model="form.academySelection.second"
                  label="Second Choice"
                  name="academy-selection-second"
                  :items="[
                    'US Air Force Academy',
                    'US Military Academy',
                    'US Merchant Marine Academy',
                    'US Naval Academy',
                  ]"
                ></v-select>
              </v-col>
              <v-col cols="12" md="3">
                <v-select
                  v-model="form.academySelection.third"
                  label="Third Choice"
                  name="academy-selection-third"
                  :items="[
                    'US Air Force Academy',
                    'US Military Academy',
                    'US Merchant Marine Academy',
                    'US Naval Academy',
                  ]"
                ></v-select>
              </v-col>
              <v-col cols="12" md="3">
                <v-select
                  v-model="form.academySelection.fourth"
                  label="Fourth Choice"
                  name="academy-selection-fourth"
                  :items="[
                    'US Air Force Academy',
                    'US Military Academy',
                    'US Merchant Marine Academy',
                    'US Naval Academy',
                  ]"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.academySelection.elsewhere"
                  name="academy-selection-elsewhere"
                  label="I am also seeking a nomination through"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field
                  v-model="form.academySelection.previous.where"
                  name="academy-selection-previous-elsewhere"
                  label="I have previously sought a nomination through"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.academySelection.previous.when"
                  label="When"
                  name="academy-selection-elsewhere-when"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card class="mb-10">
          <v-card-title
            ><v-avatar color="primary" class="mr-5" dark size="20">
              <span class="white--text body-2">7</span> </v-avatar
            >Letters of Recommendation</v-card-title
          >
          <v-card-text class="px-15 pb-5">
            <v-row>
              <v-col cols="12">
                <v-radio-group
                  v-model="lettersMethod"
                  :mandatory="true"
                  hint="If you choose 'Please contact my references', we will send an email to your references to solicit letters of recommendation from them directly"
                  persistent-hint
                >
                  <v-radio
                    label="I will attach my letters of recommendation here"
                    :value="0"
                    name="required-contact-reference"
                  ></v-radio>
                  <v-radio
                    label="Please contact my references for letters of recommendation for me"
                    :value="1"
                    name="required-contact-reference"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  v-if="lettersMethod === 0"
                  v-model="form.files.recommendation"
                  :rules="[rules.filesize()]"
                  name="file-recommendation"
                  accept=".pdf"
                  hint="File must be in PDF format. Combine multiple files into a single PDF. 500kb max size."
                  persistent-hint
                  label="Three Letters of Recommendation"
                ></v-file-input>
              </v-col>
              <v-col v-if="lettersMethod === 1" cols="12">
                <v-text-field
                  v-model="form.references.one.firstName"
                  name="reference1-firstname"
                  validate-on-blur
                  :rules="[
                    () =>
                      (!!form.references.one.firstName &&
                        lettersMethod === 1) ||
                      'This field is required',
                  ]"
                  label="Reference First Name"
                ></v-text-field>
                <v-text-field
                  v-model="form.references.one.lastName"
                  name="reference1-lastname"
                  validate-on-blur
                  :rules="[
                    () =>
                      (!!form.references.one.lastName && lettersMethod === 1) ||
                      'This field is required',
                  ]"
                  label="Reference Last Name"
                ></v-text-field>
                <v-text-field
                  v-model="form.references.one.email"
                  name="reference1-email"
                  validate-on-blur
                  class="mb-8"
                  :rules="[
                    () =>
                      (!!form.references.one.email &&
                        lettersMethod === 1 &&
                        /.+@.+/.test(form.references.one.email)) ||
                      'This field is required and must be a valid email',
                  ]"
                  label="Reference Email"
                ></v-text-field>

                <v-text-field
                  v-model="form.references.two.firstName"
                  name="reference2-firstname"
                  validate-on-blur
                  :rules="[
                    () =>
                      (!!form.references.two.firstName &&
                        lettersMethod === 1) ||
                      'This field is required',
                  ]"
                  label="Reference First Name"
                ></v-text-field>
                <v-text-field
                  v-model="form.references.two.lastName"
                  name="reference2-lastname"
                  validate-on-blur
                  :rules="[
                    () =>
                      (!!form.references.two.lastName && lettersMethod === 1) ||
                      'This field is required',
                  ]"
                  label="Reference Last Name"
                ></v-text-field>
                <v-text-field
                  v-model="form.references.two.email"
                  name="reference2-email"
                  validate-on-blur
                  class="mb-8"
                  :rules="[
                    () =>
                      (!!form.references.two.email &&
                        lettersMethod === 1 &&
                        /.+@.+/.test(form.references.two.email)) ||
                      'This field is required and must be a valid email',
                  ]"
                  label="Reference Email"
                ></v-text-field>

                <v-text-field
                  v-model="form.references.three.firstName"
                  name="reference3-firstname"
                  validate-on-blur
                  :rules="[
                    () =>
                      (!!form.references.three.firstName &&
                        lettersMethod === 1) ||
                      'This field is required',
                  ]"
                  label="Reference First Name"
                ></v-text-field>
                <v-text-field
                  v-model="form.references.three.lastName"
                  name="reference3-lastname"
                  validate-on-blur
                  :rules="[
                    () =>
                      (!!form.references.three.lastName &&
                        lettersMethod === 1) ||
                      'This field is required',
                  ]"
                  label="Reference Last Name"
                ></v-text-field>
                <v-text-field
                  v-model="form.references.three.email"
                  name="reference3-email"
                  validate-on-blur
                  :rules="[
                    () =>
                      (!!form.references.three.email &&
                        lettersMethod === 1 &&
                        /.+@.+/.test(form.references.three.email)) ||
                      'This field is required and must be a valid email',
                  ]"
                  label="Reference Email"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card class="mb-10">
          <v-card-title
            ><v-avatar color="primary" class="mr-5" dark size="20">
              <span class="white--text body-2">8</span> </v-avatar
            >Document Uploads</v-card-title
          >
          <v-card-text class="px-15 pb-5">
            <v-row>
              <v-col cols="12">
                <v-file-input
                  v-model="form.files.transcript"
                  name="file-transcript"
                  :rules="[rules.required(), rules.filesize()]"
                  accept=".pdf"
                  hint="File must be in PDF format. 500kb max size."
                  persistent-hint
                  label="Transcript of high school record, which includes junior year and class rank*"
                ></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  v-model="form.files.essay"
                  name="file-essay"
                  :rules="[rules.required(), rules.filesize()]"
                  accept=".pdf"
                  hint="File must be in PDF format. 500kb max size."
                  persistent-hint
                  label="Four Essays – Personal Testimonial*"
                ></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  v-model="form.files.photo"
                  name="file-photo"
                  :rules="[rules.required(), rules.filesize()]"
                  accept="image/*"
                  hint="File can be in any image format. 500kb max size."
                  persistent-hint
                  label="Recent photograph of applicant*"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card transparent flat elevation="0">
          <v-card-text>
            <v-alert v-if="submitStatus === 'ERROR'" type="error">
              Some required fields are missing or invalid. Please review the
              fields marked in red above.
            </v-alert>
            <v-alert v-if="submitStatus === 'SUBMIT_ERROR'" type="error">
              There was an error submitting the form. {{ message }}
            </v-alert>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              id="submitButton"
              type="submit"
              :disabled="submitStatus === 'PENDING'"
              :loading="submitStatus === 'PENDING'"
              large
              class="primary"
              >Send Nomination Request</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-container>
    </v-form>
  </v-app>
</template>

<script>
export default {
  name: 'Nominations',
  data: () => ({
    valid: true,
    dobMenu: false,
    form: {
      permission: {
        media: true,
      },
      personal: {
        firstName: null,
        middleName: null,
        lastName: null,
        email: null,
        birth: {
          date: null,
          place: null,
        },
        parents: {
          father: {
            name: null,
            occupation: null,
          },
          mother: {
            name: null,
            occupation: null,
          },
        },
      },
      legalAddress: {
        street: null,
        city: null,
        state: null,
        zipcode: null,
        phone: null,
      },
      temporaryAddress: {
        street: null,
        city: null,
        state: null,
        zipcode: null,
        phone: null,
        endDate: null,
      },
      educationEmployment: {
        highSchool: {
          location: null,
          graduation: null,
        },
        college: {
          location: null,
          yearsAttended: 0,
        },
        extraCurricularActivities: {
          clubs: [],
          additionalInfo: null,
          athleticParticipation: null,
        },
        employment: {
          where: null,
          hoursPerWeek: {
            afterSchool: 0,
            summer: 0,
          },
        },
      },
      academySelection: {
        first: null,
        second: null,
        third: null,
        fourth: null,
        elsewhere: null,
        previous: {
          where: null,
          when: null,
        },
      },
      references: {
        one: {
          firstName: null,
          lastName: null,
          email: null,
        },
        two: {
          firstName: null,
          lastName: null,
          email: null,
        },
        three: {
          firstName: null,
          lastName: null,
          email: null,
        },
      },
      files: {
        transcript: null,
        recommendation: null,
        essay: null,
        photo: null,
      },
    },
    lettersMethod: 0,
    message: 'That is all we know. Please try again.',
    submitStatus: null,
    rules: {
      required: () => {
        return (v) => !!v || `This is required`
      },
      filesize: () => {
        return (value) =>
          !value ||
          value.size < 500000 ||
          'File size should be less than 500 KB!'
      },
      email: () => {
        return (v) => /.+@.+/.test(v) || 'E-mail must be valid'
      },
      maxLength: (field, length) => {
        return (v) =>
          (v && v.length <= length) ||
          `${field} must be less than ${length} characters`
      },
      exactLength: (field, length) => {
        return (v) =>
          (v && v.length === length) ||
          `${field} must be exactly ${length} characters`
      },
    },
  }),
  head() {
    return {
      base: {
        target: '_parent',
      },
    }
  },
  watch: {
    dobMenu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    save(date) {
      this.$refs.dobMenu.save(date)
    },
    formSubmit() {
      this.$refs.form.$el.submit()
      
      // console.debug(formData)
      // try {
      //   await axios.post('http://localhost:3000/applications', formData, {
      //     header: {
      //       'Content-Type': 'multipart/form-data'
      //     }
      //   })
      // } catch {
      //   this.submitStatus = 'SUBMIT_ERROR'
      // }
      // if (!this.valid) {
      //   this.validate()
      //   this.submitStatus = 'ERROR'
      //   setTimeout(() => {
      //     this.submitStatus = 'OK'
      //   }, 5000)
      // } else {
      //   this.submitStatus = 'PENDING'
      //   const data = formData
      //   console.debug(data)
      //   try {
      //     await axios.post('http://localhost:3000/applications', data, {
      //       header: {
      //         'Content-Type': 'multipart/form-data'
      //       }
      //     })
      //   } catch {
      //     this.submitStatus = 'SUBMIT_ERROR'
      //   }
      // }
    },
  },
}
</script>

<style scoped>
.required label::after {
  content: '*';
}
</style>