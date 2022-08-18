<template>
  <div>
    <div v-if="step === 1">
      <FormsRegister />
    </div>
  </div>
</template>

<script>
export default ({
  name: 'Form',
  data() {
    return {
      form: {},
      step: 0
    }
  },
  async mounted() {
    if (!this.$route.query.a) {
      this.step = 1
    } else {
      this.form = await this.$axios.$get(`/api/applications/${this.$route.query.a}`);
      if (!this.form.firstName || !this.form.lastName || !this.form.birthday || !this.form.birthplace || !this.form.fatherName) {
        this.$router.replace(`/application/personal?a=${this.$route.query.a}`)
      }
    }
  }
})
</script>


