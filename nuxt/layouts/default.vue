<template>
  <v-app light>
    <v-main>
      <v-app-bar elevation="0" height="80">
        <v-spacer></v-spacer>
        <v-avatar>
          <img
            src="https://imageproxy-kal2mblwyq-ue.a.run.app/80/https://storage.googleapis.com/demcom-directory/seal.jpg"
            alt="US House seal"
          />
        </v-avatar>
        <v-spacer></v-spacer>
      </v-app-bar>
      <v-container fluid>
            <v-container>
      <h1 class="my-0 text-center" style="font-family: serif">
        US Service Academies Nomination Application Form
      </h1>
      <h2 class="text-center mb-0"
        style="font-family: serif">
        Honorable Steny H. Hoyer (MD-05)
      </h2>
    </v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>
