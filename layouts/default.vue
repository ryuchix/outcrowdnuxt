<template>
  <div>
    <Appbar @drawerStatus="openDrawer"/>
    <v-container>
      <nuxt />
    </v-container>
    <Drawer :drawer="drawer" />
    <Footer/>
  </div>
</template>
<script>
import Drawer from "@/components/system/drawer";
import Footer from "@/components/home/footer";
import Appbar from "@/components/home/appbar";
import Echo from "laravel-echo"
import Pusher from 'pusher-js'

export default {
  components: {
    Footer, Appbar
  },
  data() {
    return {
      drawer: false,
    }
  },
  mounted() {
    this.listenToBroadcast();
  },
  methods: {
    openDrawer() {
      this.drawer = false;
      if (!this.drawer)
        this.drawer = true;
      else
        this.drawer = false;
    },
    listenToBroadcast() {
      if (this.$auth.loggedIn) {
        var pusher = new Pusher('5ebf5f5a9fe86ddb01d3', {
          cluster: 'ap1'
        });

        var that = this;
        var channel = pusher.subscribe('outcrowd-channel-' + this.$auth.user.id);
        channel.bind('outcrowd-event', function(data) {
          that.$auth.fetchUser()
        });
      }
    },
  }
}
</script>
<style lang="scss" scoped>
  .container {
    padding: 0;
  }
  .v-toolbar__title {
    color: #434399;
    font-size: 20px;
    line-height: 24px;
  }
  .v-sheet {
    background-color: #FFFFFF;
  }
</style>