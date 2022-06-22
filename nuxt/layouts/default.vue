<template>
  <v-app light>
    <v-main>
      <v-container fluid>
        <v-row justify="space-around" class="my-5">
          <v-avatar>
            <img
              src="https://imageproxy-kal2mblwyq-ue.a.run.app/80/https://storage.googleapis.com/demcom-directory/seal.jpg"
              alt="US House seal"
            />
          </v-avatar>
        </v-row>
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
