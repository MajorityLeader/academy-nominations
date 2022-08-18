<script>
export default ({
  data() {
    return {
      form: {}
    }
  },
  async $fetch() {
    this.form = await this.$axios.$get(`/api/application/${this.$route.$params.query.a}`);
    if (!form.firstName || !form.lastName || !form.birthday || !form.birthplace || !form.fatherName) {
      this.$router.replace(`/academy-nominations/personal`)
    }
  }
})
</script>
