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

    <v-card class="mx-auto">
      <v-list-item>
        <v-list-item-avatar color="grey" v-ripple >
          <img class="post-avatar" src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-ripple>sssssss</v-list-item-title>
          <v-list-item-subtitle>2h</v-list-item-subtitle>
        </v-list-item-content>
        <v-spacer></v-spacer>
        <star-rating :show-rating="showrating" read-only :rating="rating" v-bind:star-size="20"></star-rating>
      </v-list-item>
      <v-spacer></v-spacer>
      <v-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus distinctio harum, nulla placeat, rerum totam magni porro eos impedit incidunt, accusantium inventore animi pariatur laborum deleniti officiis nesciunt debitis perspiciatis.</v-card-text>
      <v-card-actions>
        <div class="event-name">
          Event name
        </div>
      </v-card-actions>
    </v-card>


  </v-app>
  </div>
</template>
<script>
import { API_URL, HEADERS} from "@/store/config";
import axios from "axios";
import StarRating from 'vue-star-rating/src'

export default {
  name: "Reviews",
  layout: 'fullpage',
  head: {
    title: 'Reviews',
  },
  middleware: 'auth',
  components: {
    StarRating,
  },
  data() {
    return {
        valid: true,
        loading: false,
        events: [],
        closeOnContentClick: true,
        rating: 2,
        showrating: false
    };
  },
  methods: {
    //
  }
};
</script>
<style lang="scss">
.reviews {
  background-color: #e5e5e5 !important;
  .v-toolbar {
    .v-icon {
      color: #434399;
    }
  }
  .v-application--wrap {
    width: 100%;
    padding: 12px;
    margin-right: auto;
    margin-left: auto;
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
  .v-card {
    margin-bottom: 10px;
    box-shadow: none !important;
    margin-top: 60px;
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
  .event-name {
    font-weight: normal;
    font-size: 10px;
    line-height: 12px;

    color: #000000;

    mix-blend-mode: normal;
    opacity: 0.54;
    margin-left: 10px;
  }
}
</style>