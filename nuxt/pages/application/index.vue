<template>
  <div>
    <div v-if="!$route.query.a">
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
    }
  },
  async mounted() {
    if (this.$route.query.a) {
      this.form = await this.$axios.$get(`/api/applications/${this.$route.query.a}`);
      if (!this.form.firstName || !this.form.lastName || !this.form.birthDate || !this.form.birthPlace || !this.form.fatherName) {
        this.$router.replace(`/application/personal?a=${this.$route.query.a}`)
      }
    }
  }
})
</script>


