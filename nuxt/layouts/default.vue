<template>
  <v-app light>
    <v-main>
      <v-app-bar elevation="0">
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
