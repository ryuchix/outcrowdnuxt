<template>
  <div id="app" v-if="!loading">
    <v-app class="my-event">
      <v-toolbar 
      style="background: linear-gradient(180deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.6) 100%);"
      flat 
      fixed 
      prominent
      extended 
      height="220px"
      :src="event.image">
        <v-btn icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="flex-column align-start">{{ event.name }}
          <div class="d-flex mt-3">
            <v-avatar width="20" height="20" min-width="20" v-for="goers in event.going_user" :key="goers.id">
              <img :src="goers.profile_image"
                :alt="goers.firstname">
            </v-avatar>          
            <span>{{ event.going_count }} people going</span>
          </div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu bottom right flat v-if="event.is_admin">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                icon
                v-bind="attrs"
                v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list flat tile>
              <v-list-item link @click="$router.push({path: '/events/event/edit/' + event.id})">
                <v-list-item-title>Edit details</v-list-item-title>
              </v-list-item>
              <v-list-item link>
                <v-list-item-title>Delete event</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
      </v-toolbar>
      <div class="content">
        <v-container>
            <div class="subheading">
              Where?
            </div>
            <div class="title justify-space-between pt-5 pb-5">
              {{ event.location }}
              <v-btn icon>
                <v-icon color="#434399">mdi-map-outline</v-icon>
              </v-btn>
            </div>
            <div class="subheading ">
              When?
            </div>
            <div class="title justify-space-between pt-5 pb-5">
              {{ event.date + ' - ' + event.time }}
            </div>
            <div class="subheading ">
              Description
            </div>
            <div class="description pt-5">
              {{ event.description }}
            </div>
            <div class="invite-f mt-5" v-if="event.is_admin || event.open_invatation == 1">
              <v-btn icon @click="$router.push({path: '/events/invite-friend/' + event.id})">
                <v-icon color="#E24444">mdi-plus-circle-outline</v-icon>
              </v-btn>
              <span @click="$router.push({path: '/events/invite-friend/' + event.id})" v-ripple>Invite friends</span>
            </div>
        </v-container>
      </div>
      <EventFooter :is_admin="event.is_admin" :going="event.going" :interested="event.interested"/>
    </v-app>
  </div>
</template>
<script>
import { API_URL, HEADERS} from "@/store/config";
import axios from "axios";
import moment from 'moment'
import EventFooter from "@/components/event/eventfooter";

export default {
  name: 'MyEvent',
  layout: 'fullpage',
  head: {
    title: 'My event',
  },
  middleware: 'auth',
  components: {
    EventFooter
  },
  async fetch() {
    await axios.get(API_URL + '/api/get-event/' + this.eventid, {
      headers: HEADERS(this.$auth.getToken('password_grant'))
    }).then(res => {
      this.event = res.data
      this.loading = false
    })
  },
  data() {
    return {
      eventid: this.$route.params.id,
      event: [],
      loading: true,
    }
  },
}
</script>
<style scoped>
.v-avatar:not(:first-child) { 
  margin-left: -5px;
}
</style>
<style lang="scss">
  .my-event {
    .v-application--wrap {
      display: block;
    }
    .v-toolbar {
      .v-avatar {
        img {
          object-fit: cover;
        }
      }
      .v-icon {
        color: #ffffff;
      }
      .v-toolbar__title {
        width: 80%;
        white-space: pre-line;
        padding-left: 0px !important;
        position: absolute;
        font-style: normal;
        font-weight: 500;
        font-size: 34px;
        line-height: 40px;
        display: flex;
        align-items: flex-end;

        color: #FFFFFF;
        span {
          margin-left: 10px;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 23px;
          /* identical to box height, or 164% */

       
          font-feature-settings: 'liga' off;

          color: rgba(255, 255, 255, 0.7);
        }

        .v-avatar {
          margin-right: 0 !important;
          img {
            border: 0;
          }
        }
      }
    }
    .content {
      height: 100%;
      background: #fff;
      .subheading {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        /* identical to box height */

        display: flex;
        align-items: center;

        /* Dark slate blue */

        color: #434399;
      }
      .title {
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 24px;
        /* identical to box height */

        display: flex;
        align-items: center;
        font-feature-settings: 'liga' off;

        color: rgba(0, 0, 0, 0.87);
      }
      .description {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 23px;
        /* or 164% */

        font-feature-settings: 'liga' off;

        color: rgba(0, 0, 0, 0.87);      
      }
      .invite-f {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        /* identical to box height */
        text-transform: uppercase;
        display: flex;
        align-items: center;

        /* Imperial red */

        color: #E24444;
      }
    }
  }
</style>