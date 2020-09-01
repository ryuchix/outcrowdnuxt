<template>
  <v-app>
    <Appbar :title="text" />
    <Content :events="events" />
  </v-app>
</template>
<script>
import Appbar from "@/components/event/eventappbar";
import Content from "@/components/event/content";
import { API_URL, HEADERS} from "@/store/config";
import axios from "axios";

export default {
  layout: 'fullpage',
  head: {
    title: 'Interested events',
  },
  middleware: 'auth',
  components: {
    Appbar
  },
  data() {
    return {
      text: 'Interested events',
      events: []
    }
  },
  async fetch() {
    await axios.get(API_URL + '/api/user-home-events/' + this.$route.params.id, {
      headers: HEADERS(this.$auth.getToken('password_grant'))
    })
    .then(response => {
      this.events = response.data.interested;
    })
  },
}
</script>
<style lang="scss" scoped>
.v-application {
  background: #E5E5E5;
}
</style>