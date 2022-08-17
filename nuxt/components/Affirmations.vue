<template>
  <v-form>
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
  </v-container>
  </v-form>
</template>