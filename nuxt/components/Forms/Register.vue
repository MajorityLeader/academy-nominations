<template>
  <v-form ref="form" @submit.prevent>
    <v-container>
      <v-card outlined class="mb-10">
        <v-card-title>
          <v-avatar color="primary" class="mr-5" dark size="20">
            <span class="white--text body-2">1</span>
          </v-avatar>Start a new application
        </v-card-title>
        <v-card-text>
          <v-text-field outlined label="Email address" v-model="form.email" :rules="[rules.required()]"></v-text-field>
        </v-card-text>
      </v-card>
      <v-card outlined>
        <v-card-title>
          <v-avatar color="primary" class="mr-5" dark size="20">
            <span class="white--text body-2">2</span>
          </v-avatar>Required Confirmations
        </v-card-title>
        <v-card-text class="px-15 pb-5">
          <div>Before starting your application, please confirm that:</div>
          <v-row>
            <v-col cols="12">
              <v-checkbox :rules="[rules.required()]">
                <template v-slot:label>
                  <div>
                    I have read the Information Sheet on the
                    <a target="_blank" href="/help/nominations-faq" @click.stop>FAQ page</a>
                    explaining the nominating procedure and am familiar with the
                    requirements.
                  </div>
                </template>
              </v-checkbox>
              <v-checkbox :rules="[rules.required()]"
                label="I certify that I am a legal resident of the fifth congressional district of Maryland.">
              </v-checkbox>
              <v-checkbox :rules="[rules.required()]">
                <template v-slot:label>
                  <div>
                    I understand that, if my application packet is not
                    submitted by the deadline posted above in the FAQ page, I will not be
                    scheduled for an interview and given final consideration for
                    a nomination.
                  </div>
                </template>
              </v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="1">
              <v-radio-group v-model="form.permission.media" :mandatory="true">
                <v-radio label="Yes" :value="true" name="permission-media"></v-radio>
                <v-radio label="No" :value="false" name="permission-media"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col>
              <div class="mt-5">
                I hereby give permission to Congressman Hoyer's office to
                provide my name to any local media who may be interested in
                contacting me upon the publication of my name in local
                newspapers if I receive a nomination and/or appointment to a
                U.S. Service Academy. (optional)
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card transparent flat elevation="0">
        <v-card-text>
          <v-alert v-if="error.status === 'ERROR'" type="error">
            There was an error submitting the form. {{ message }}
          </v-alert>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn id="submitButton" @click="submitForm" :loading="loading" large class="primary">Next</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'Register',
  data: () => ({
    valid: true,
    loading: false,
    error: {
      status: null,
      message: null
    },
    form: {
      email: null,
      permission: {
        media: true,
      },
    },
    rules: {
      required: () => {
        return (v) => !!v || `This is required`
      }
    },
  }),
  methods: {
    async submitForm() {
      this.loading = true
      this.$refs.form.validate()
      try {
        await this.$axios.$post(`/register`, this.form)
      }
      catch (e) {
        this.error.status = "ERROR"
        this.error.message = e.message
        console.error(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
</style>