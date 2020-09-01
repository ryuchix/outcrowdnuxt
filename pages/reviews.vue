<template>
  <div id="app">
  <v-app class="reviews">
    <v-toolbar flat fixed>
      <v-btn icon @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Reviews</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-list-item class="grow lists" v-for="(event, index) in events" :key="index">
      <v-list-item-avatar color="grey darken-3 list-image" v-ripple @click="$router.push({path: '/events/event/' + event.id})">
        <v-img
          class="elevation-6"
          :src="event.image"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>
          <div class="d-flex flex-column">
            <div class="event-name" v-ripple @click="$router.push({path: '/events/event/' + event.id})"> {{ event.name }} </div>
            <div class="flex-row align-center row mt-n4">
              <div class="col-8 flex-column"> 
                <div class="event-date">{{ event.date }} {{ event.time }}</div>
                <div class="event-location">{{ event.location }}</div>
              </div>
              <div class="col-4 hosting-star"> 
                <v-btn text @click="isInterested(event.id, events, index, star = !event.interested)">
                  <v-icon v-if="event.interested" style="color: #FFB800;">{{ event.interested ? unclickStar : clickStar }}</v-icon>
                  <v-icon v-if="!event.interested">{{ event.interested ? unclickStar : clickStar }}</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </v-list-item-title>

      </v-list-item-content>
    </v-list-item>
  </v-app>
  </div>
</template>
<script>
import { API_URL, HEADERS} from "@/store/config";
import axios from "axios";

export default {
  name: "Reviews",
  layout: 'fullpage',
  head: {
    title: 'Reviews',
  },
  middleware: 'auth',
  data() {
    return {
        valid: true,
        loading: false,
        events: []
    };
  },
  methods: {
    //
  }
};
</script>
<style lang="scss">
.reviews {
  .v-toolbar {
    .v-icon {
      color: #434399;
    }
  }
  .v-toolbar__title {
    color: #434399;
    font-weight: normal;
    line-height: 24px;
    display: flex;
    align-items: center;
    margin-left: 30px;
  }
  .v-toolbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
  }
  .ce-form {
    .text {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      /* or 143% */


      color: rgba(0, 0, 0, 0.87);
    }
  }
  .lists {
    .v-list-item__content {
      padding: 12px 12px 12px 0;
    }
    background: #FFFFFF;
    border-radius: 6px;
    height: 79px;
    padding: 0;
    margin: 10px;
    .list-image {
      height: 79px !important;
      width: 100px !important;
      border-radius: 6px 0 0 6px;
    }
    .event-name {
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      /* identical to box height */

      display: flex;
      align-items: center;
      margin-top: 15px;
      color: #000000;
      z-index: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: fit-content;
    }
    .event-date {
      font-weight: normal;
      font-size: 10px;
      line-height: 12px;
      /* identical to box height */

      display: flex;
      align-items: center;

      color: #000000;
    }
    .event-location {
      font-weight: normal;
      font-size: 10px;
      line-height: 12px;
      /* identical to box height */

      display: flex;
      align-items: center;

      color: #000000;
    }
  }
}
</style>