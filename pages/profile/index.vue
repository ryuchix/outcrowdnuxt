<template>
  <v-app>
    <Appbar @drawer_status="setDrawer" :user="$auth.user" @sendActiveTab="setActiveTab" :other="other"/>
    <v-container class="profile-container">
      <div v-if="$route.query.tab == 0 || $route.params.id == $auth.user.id">
        <Post />
      </div>
      <div v-if="$route.query.tab == 1">
        <Friend />
      </div>
      <div v-if="$route.query.tab == 2">
        <Event />
      </div>
    </v-container>
    <Drawer :drawer="drawer" />
    <Footer />
  </v-app>
</template>
<script>
import Footer from "@/components/home/footer";
import Appbar from "@/components/profile/appbar";
import Drawer from "@/components/system/drawer";
import Post from "@/components/profile/post";
import Friend from "@/components/profile/friend";
import Event from "@/components/profile/event";

export default {
  middleware: 'auth',
  layout: 'Fullpage',
  head: {
    title: 'Profile',
  },
  components: {
      Footer, Appbar, Drawer, Post, Friend, Event
  },
  data() {
    return {
      user: [],
      activeTab: 0,
      drawer: false,
      showPost: false,
      showFriend: false,
      showEvent: false,
      other: false,
    }
  },    
  async getPosts() {
    await axios.get(API_URL + "/api/user-posts", {
      headers: HEADERS(this.$auth.getToken('password_grant'))
    })
    .then(response => {
      const data = response.data.data
      this.posts = data
      this.loading = false
    })
  },
  mounted() {
    this.$router.push({path: '/profile?tab=0'})
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
      this.drawer = false
    }
  },
  methods: {
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
