<template>
  <v-app>
    <Appbar @drawer_status="setDrawer" :user="$auth.user" @sendActiveTab="setActiveTab"/>
    <v-container class="profile-container">
      <nuxt />
    </v-container>
    <Drawer :drawer="drawer" />
    <Footer />
  </v-app>
</template>
<script>
import Footer from "@/components/home/footer";
import Appbar from "@/components/profile/appbar";
import Drawer from "@/components/system/drawer";

export default {
  middleware: 'auth',
  components: {
      Footer, Appbar, Drawer
  },
  data() {
    return {
      user: [],
      activeTab: 0,
      drawer: false,
      showPost: false,
      showFriend: false,
      showEvent: false,
    }
  },
  mounted() {
    if (this.$route.query.tab == 0)
      this.activeTab = 0
    else if (this.$route.query.tab == 1)
      this.activeTab = 1
    else if (this.$route.query.tab == 2)
      this.activeTab = 2
    else
      this.activeTab = 0
  },
  watch: {
    activeTab(val) {
      this.$router.push({path: '/profile?tab=' + val})
    }
  },
  methods: {
    openDrawer() {
      this.drawer = false;
      if (!this.drawer)
        this.drawer = true;
      else
        this.drawer = false;
    },
    setDrawer(data) {
      this.drawer = data;
    },
    setActiveTab(data) {
      this.activeTab = data
    }
  }
}
</script>
<style lang="scss">
.profile-container {
  padding-top: 300px; 
  padding-bottom: 70px; 
  background: #e5e5e5;
  height: 100%;
}
</style>