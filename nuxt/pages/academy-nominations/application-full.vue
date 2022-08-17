<template>
  <div>
    <v-container>
      <h1 class="my-0 text-center" style="font-family: serif">
        US Service Academies Nomination Application Form
      </h1>
      <h2
        v-if="$route.query && $route.query.sd && $route.query.sd == 'md05'"
        class="text-center mb-0"
        style="font-family: serif"
      >
        Honorable Steny H. Hoyer (MD-05)
      </h2>
    </v-container>
    <FormsAcademyNominations />
  </div>
</template>

<script>
export default {}
</script>


