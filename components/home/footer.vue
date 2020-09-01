<template>
  <div id="home-footer" v-if="$route.name != 'profile-id'">
    <v-bottom-navigation
      class="home-footer"
      v-model="bottomNavv"
      light
      shift
      grow
      color="#E24444"
      fixed>
      <v-btn @click="openHome()">
        <span>Home</span>
        <v-icon>mdi-home-outline</v-icon>
      </v-btn>

      <v-btn @click="openEvent()">
        <span>Event</span>
        <v-icon>mdi-calendar-text-outline</v-icon>
      </v-btn>

      <v-btn @click="openSearch()">
        <span>Search</span>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn @click="openProfile()">
        <span>Profile</span>
        <v-icon>mdi-face-profile</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <Fab />
  </div>
</template>
<script>
import Fab from "@/components/system/fab";
export default {
  data() {
    return {
      bottomNavv: 0,
    }
  },
  components: {
    Fab
  },
  mounted() {
    if (this.$route.path == '/')
      this.bottomNavv = 0
    if (this.$route.path == '/events')
      this.bottomNavv = 1
    if (this.$route.path == '/search')
      this.bottomNavv = 2
    if (this.$route.path == '/profile' || this.$route.name == 'profile-id')
      this.bottomNavv = 3
    if (this.$route.name == 'events-interested')
      this.bottomNavv = 1
  },
  methods: {
    openHome() {
      this.bottomNavv = 0
      this.$router.replace({path: '/'}).catch(err => {})
    },
    openEvent() {
      this.bottomNavv = 1
      this.$router.replace({path: '/events'}).catch(err => {})
    },
    openSearch() {
      this.bottomNavv = 2
      this.$router.replace({path: '/search'}).catch(err => {})
    },
    openProfile() {
      this.bottomNavv = 3
      this.$router.replace({path: '/profile'}).catch(err => {})
    },
  }
}
</script>
<style scoped lang="scss">

</style>