<template>
  <v-app>
    <Appbar :user="user" @sendActiveTab="setActiveTab" :other="other" @fetchNewData="getUser" />
    <v-container class="profile-container">
      <div v-if="$route.query.tab != 1 && $route.query.tab != 2">
        <Post />
      </div>
      <div v-if="$route.query.tab == 1">
        <Friend />
      </div>
      <div v-if="$route.query.tab == 2">
        <Event />
      </div>
    </v-container>
    <Footer :loading="loading" :user="user" @fetchNewData="getUser"/>
  </v-app>
</template>
<script>
import Appbar from "@/components/profile/appbar";
import Footer from "@/components/otherprofile/otherfooter";
import Drawer from "@/components/system/drawer";
import Post from "@/components/otherprofile/post";
import Friend from "@/components/otherprofile/friend";
import Event from "@/components/otherprofile/event";
import { API_URL, HEADERS} from "@/store/config";
import axios from "axios";

export default {
  middleware: 'auth',
  layout: 'Fullpage',
  name: 'UserProfile',
  head: {
    title: 'User Profile',
  },
  components: {
      Footer, Appbar, Drawer, Post, Friend, Event
  },
  data() {
    return {
      user: {},
      activeTab: 0,
      drawer: false,
      showPost: false,
      showFriend: false,
      showEvent: false,
      id: this.$route.params.id,
      loading: true,
      other: true,
    }
  },
  mounted() {
    this.getUser()
    if (this.$route.query.tab == 0)
      this.activeTab = 0
    else if (this.$route.query.tab == 1)
      this.activeTab = 1
    else if (this.$route.query.tab == 2)
      this.activeTab = 2
    else
      this.activeTab = 0

    if (this.$route.params.id == this.$auth.user.id)
      this.$router.push({path: '/profile'})

    this.listenToBroadcast();
  },
  watch: {
    activeTab(val) {
      this.$router.push({path: '/profile/'+ this.id +'?tab=' + val})
      this.drawer = false
    }
  },
  methods: {
    async getUser() {
      await axios.get(API_URL + "/api/user-profile/" + this.id, {
        headers: HEADERS(this.$auth.getToken('password_grant'))
      })
      .then(response => {
        this.user = response.data
        this.loading = false
      })
    },
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
    },
    listenToBroadcast() {
      if (this.$auth.loggedIn) {
        var pusher = new Pusher('5ebf5f5a9fe86ddb01d3', {
          cluster: 'ap1'
        });

        var that = this;
        var channel = pusher.subscribe('outcrowd-channel-' + this.$auth.user.id);
        channel.bind('outcrowd-event', function(data) {
          that.getUser()
        });
      }
    },
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
