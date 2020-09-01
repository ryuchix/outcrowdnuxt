<template>
  <v-app class="events" v-if="!loading">
    <div class="d-flex justify-space-between">
      <div class="event-status" v-if="currently != null && currently.length > 0">Currently Happening</div>
      <div @click="$router.push({path: '/events/ongoing'})" class="event-status-see-all" v-ripple v-if="currently != null && currently.length > 1">See all</div>
    </div>
    <div class="hosting">
      <div class="hosting-event">
        <v-card
          v-for="(item, index) in currently"
          :key="index"
          flat
          max-width="200">
          <v-img
            class="white--text align-end"
            height="142px"
            width="200px"
            :src="item.image">
          </v-img>
          <v-card-text class="text--primary row">
            <div class="col-9">
              <div v-ripple @click="$router.push({path: 'events/event/' + item.id})" class="event-name">{{ item.name }}</div>
              <div class="event-date">{{ item.date }} - {{ item.time }}</div>
              <div class="event-loc">{{ item.location }}</div>
            </div>
            <div class="col-3 hosting-star"> 
                <v-btn text @click="isInterested(item.id, currently, index, star = !item.interested)">
                  <v-icon v-if="item.interested" style="color: #FFB800;">{{ item.interested ? unclickStar : clickStar }}</v-icon>
                  <v-icon v-if="!item.interested">{{ item.interested ? unclickStar : clickStar }}</v-icon>
                </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </div>
    <div class="d-flex justify-space-between">
      <div class="event-status" v-if="upcoming != null && upcoming.length > 0">Upcoming</div>
      <div @click="$router.push({path: '/events/upcoming'})" class="event-status-see-all" v-ripple v-if="upcoming != null && upcoming.length > 1">See all</div>
    </div>
    <div class="hosting">
      <div class="hosting-event">
        <v-card
          v-for="(item, index) in upcoming"
          :key="index"
          flat
          max-width="200">
          <v-img
            class="white--text align-end"
            height="142px"
            width="200px"
            :src="item.image">
          </v-img>
          <v-card-text class="text--primary row">
            <div class="col-9">
              <div v-ripple @click="$router.push({path: 'events/event/' + item.id})" class="event-name">{{ item.name }}</div>
              <div class="event-date">{{ item.date }} - {{ item.time }}</div>
              <div class="event-loc">{{ item.location }}</div>
            </div>
            <div class="col-3 hosting-star"> 
                <v-btn text @click="isInterested(item.id, upcoming, index, star = !item.interested)">
                  <v-icon v-if="item.interested" style="color: #FFB800;">{{ item.interested ? unclickStar : clickStar }}</v-icon>
                  <v-icon v-if="!item.interested">{{ item.interested ? unclickStar : clickStar }}</v-icon>
                </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </div>
    <div class="d-flex justify-space-between">
      <div class="event-status" v-if="myinterested != null && myinterested.length > 0">Interested</div>
      <div @click="$router.push({path: '/events/interested'})" class="event-status-see-all" v-ripple v-if="myinterested != null && myinterested.length > 1">See all</div>
    </div>
    <div class="hosting">
      <div class="hosting-event">
        <v-card
          v-for="(item, index) in myinterested"
          :key="index"
          flat
          max-width="200">
          <v-img
            class="white--text align-end"
            height="142px"
            width="200px"
            :src="item.image">
          </v-img>
          <v-card-text class="text--primary row">
            <div class="col-9">
              <div v-ripple @click="$router.push({path: 'events/event/' + item.id})" class="event-name">{{ item.name }}</div>
              <div class="event-date">{{ item.date }} - {{ item.time }}</div>
              <div class="event-loc">{{ item.location }}</div>
            </div>
            <div class="col-3 hosting-star"> 
                <v-btn text @click="isInterested(item.id, myinterested, index, star = !item.interested)">
                  <v-icon v-if="item.interested" style="color: #FFB800;">{{ item.interested ? unclickStar : clickStar }}</v-icon>
                  <v-icon v-if="!item.interested">{{ item.interested ? unclickStar : clickStar }}</v-icon>
                </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </v-app>
</template>
<script>
import { API_URL, HEADERS} from "@/store/config";
import axios from "axios";

export default {
  name: 'Events',
  layout: 'Default',
  head: {
    title: 'Events',
  },
  middleware: 'auth',
  data() {
    return {
      clickStar: 'mdi-star-outline',
      unclickStar: 'mdi-star',
      interested: false,
      loading: true,
      currently: [],
      upcoming: [],
      myinterested: [],
    }
  },
  async fetch() {
    this.loading = true;
    await axios.get(API_URL + '/api/home-events', {
      headers: HEADERS(this.$auth.getToken('password_grant'))
    })
    .then(response => {
      this.currently = response.data.currently;
      this.upcoming = response.data.upcoming;
      this.myinterested = response.data.interested;
    })
    .catch(error => {})
    .finally(() => {this.loading = false})
  },
  methods: {
    isInterested(id, list, index, star) {
      this.$set(list[index], 'interested', star)
      this.saveInterest(id, star)
    },
    async saveInterest(id, star) {
      const form = new FormData();
      form.append('event_id', id);
      form.append('interested', star);
      await axios.post(API_URL + '/api/event-isinterested', form, {
        headers: HEADERS(this.$auth.getToken('password_grant'))
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.v-application {
  background: #e5e5e5;
  margin-top: 60px;
  margin-bottom: 50px;
  padding: 12px;
  .v-sheet {
    box-shadow: none;
  }
}
  .event-status {
    color: rgba(0, 0, 0, 0.54);
    font-size: 14px;
    line-height: 23px;
    display: flex;
    align-items: center;
    font-feature-settings: 'liga' off;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .event-status-see-all {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    text-align: right;

    color: #434399;
  }
  .hosting {
    .event-name {
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      display: flex;
      align-items: center;
    }
    .event-date {
      font-weight: normal;
      font-size: 10px;
      line-height: 12px;
      display: flex;
      align-items: center;
    }
    .event-loc {
      font-weight: normal;
      font-size: 10px;
      line-height: 12px;
      display: flex;
      align-items: center;
    }
    .hosting-star {
      padding-left: 0;
    }
    .hosting-event {
      display: flex;
      overflow-x: scroll;
      .v-card {
        margin-right: 15px;
      }
    }
  }
</style>
<style lang="scss">

</style>