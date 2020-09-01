<template>
  <v-bottom-navigation v-if="!is_admin" class="event-bottom-nav justify-start" background-color="#E24444" fixed horizontal>
    <v-btn value="going" v-if="!going" @click="isGoing">
      <span>Going</span>
      <v-icon>mdi-check</v-icon>
    </v-btn>
    <v-btn value="going" v-if="going" @click="isGoing">
      <span>Cancel</span>
      <v-icon>mdi-close</v-icon>
    </v-btn>

    <v-btn value="interested" @click="isInterested">
      <span>Interested</span>
      <v-icon>{{ interested ? unclickStar : clickStar }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
import { API_URL, HEADERS} from "@/store/config";
import axios from "axios";

export default {
  props: ['is_admin', 'going', 'interested'],
  data() {
    return {
      clickStar: 'mdi-star-outline',
      unclickStar: 'mdi-star',
      id: this.$route.params.id,
    }
  },
  methods: {
    async saveInterest() {
      const form = new FormData();
      form.append('event_id', this.id);
      form.append('interested', this.interested);
      form.append('going', this.going);
      await axios.post(API_URL + '/api/event-isinterested', form, {
				headers: HEADERS(this.$auth.getToken('password_grant'))
      })
    },
    isInterested() {
      this.interested = !this.interested;
      this.clickStar = this.interested ? 'mdi-star' : 'mdi-star-outline';
      this.saveInterest();
    },
    isGoing() {
      this.going = !this.going;
      this.saveInterest();
    },
  }
}
</script>
<style lang="scss" scoped>
  .event-bottom-nav {
    .v-icon {
      color: #ffffff;
    }
    span {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      display: flex;
      align-items: center;
      text-align: center;
      text-transform: uppercase;
      /* White */

      color: #FFFFFF;
    }
  }
</style>