<template>
  <div class="content">
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
  </div>
</template>
<script>
import { API_URL, HEADERS} from "@/store/config";
import axios from "axios";

export default {
  props: ['events'],
  data() {
    return {
      clickStar: 'mdi-star-outline',
      unclickStar: 'mdi-star',
      interested: false,
    }
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
.content {
  margin-top: 60px
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
</style>