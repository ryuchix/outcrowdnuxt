<template>
  <v-app-bar
    class="overflow-hidden"
    fixed
    dark
    prominent
    extended
    extension-height="80"
    shrink-on-scroll>
    <v-btn icon @click="$router.replace({name: 'profile'})" v-if="$route.name == 'profile-id'">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-toolbar-title width="100%">
      <v-avatar height="115" width="115">
        <img :src="user.profile_image">
      </v-avatar>
      <div class="d-flex flex-column w100">
        <div class="name">{{ user.firstname }} {{ user.lastname }}
          <span class="address">{{ user.address }}</span>
          <span class="score1 align-start">{{ user.score }} credit score ({{ user.review_count }} reviews)</span>
        </div>
        <div class="score-section">
          <span class="score2">{{ user.score }} credit score ({{ user.review_count }} reviews)</span>
          <v-progress-linear class="" :value="user.score" style="align-self: flex-end; border-radius: 10px" background-color="white" background-opacity="0.54" color="white"></v-progress-linear>
        </div>
      </div>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-app-bar-nav-icon v-if="!other" @click="openDrawer"></v-app-bar-nav-icon>
    <v-menu
      v-if="other"
      nudge-width="150"
      nudge-left="150"
      bottom
      :close-on-content-click="closeOnContentClick">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="openUnfriendDialog()" v-if="user.is_friend">
          <v-list-item-title>Unfriend</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-title>Block</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-title>Report</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <template v-slot:extension>
      <v-tabs grow align-with-title v-model="activeTab">
        <v-tab>{{ user.post_count }} <span>Posts</span></v-tab>
        <v-tab>{{ user.friend_count }} <span>Friends</span></v-tab>
        <v-tab>{{ user.event_count }} <span>Events</span></v-tab>
      </v-tabs>
    </template>
    <v-dialog light v-model="unfriendDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Confirmation</v-card-title>
        <v-card-text>Are you sure you want to unfriend {{ user.firstname }}?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="unfriendDialog = false">Cancel</v-btn>
          <v-btn
            :disabled="!valid"
            :loading="unfriendloading"
            color="green darken-1"
            text
            @click="unfriend">Unfriend</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>
<script>
import { API_URL, HEADERS} from "@/store/config";
import axios from "axios";

export default {
  name: 'ProfileAppbar',
  props: ['user', 'other'],
  data() {
    return {
      loading: false,
      activeTab: 0,
      drawer: false,
      unfriendDialog: false,
      valid: true,
      unfriendloading: false,
      closeOnContentClick: true
    }
  },
  mounted() {
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
      this.$emit('sendActiveTab', val)
    }
  },
  methods: {
    openDrawer() {
      this.drawer = false
      this.$emit('drawer_status', false)
      if (!this.drawer) {
        this.drawer = true
        this.$emit('drawer_status', true)
      } else {
        this.drawer = false
        this.$emit('drawer_status', false)
      }
    },
    openUnfriendDialog() {
      this.unfriendDialog = true
    },
    async unfriend() {
      this.unfriendloading = true;
      await axios.get(API_URL + "/api/unfriend-request/" + this.user.id, {
        headers: HEADERS(this.$auth.getToken('password_grant'))
      })
      .then(response => {
        this.$emit('fetchNewData', null)
        this.unfriendDialog = false
        this.unfriendloading = false
      })
      .catch(error => {this.unfriendloading = false;})
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
.score-section {
  height: 100%; 
  text-align: right;    
  display: flex;
  flex-direction: column;
  place-content: flex-end;
}
.v-tab {
  margin-left: 0 !important;
}
.v-app-bar--shrink-on-scroll {
  background: linear-gradient(180deg, #E24444 0%, #434399 100%);
  .score1 {
    display: none;
  }
  .v-avatar {
    display: block;
  }
  &.v-app-bar--is-scrolled {
    background: #fff !important;
    .score1 {
      display: flex;
    }
    .v-progress-linear {
      display: none !important;
    }
    .address {
      display: none !important;
    }
    .score2 {
      display: none !important;
    }
    .v-avatar {
      display: none;
    }
    .v-toolbar__title {
      position: relative;
      top: 20px;
      align-self: center;
      padding-bottom: 0px !important;
      padding-top: 0px !important;
      .name {
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        font-feature-settings: 'liga' off;

        /* Black */

        color: #000000;
      }
      span {
        font-style: normal;
        font-weight: normal;
        font-size: 10px;
        line-height: 12px;
        /* identical to box height */

        display: flex;
        align-items: center;
        text-align: right;

        /* Dark slate blue */

        color: #434399;
        opacity: 0.54;
      }
    }
    .v-app-bar__nav-icon {
      color: #434399;
      span {
        color: #434399;
      }
    }
    .v-tabs {
      .v-tabs-slider {
        color: #E24444;
      }
      .v-tab {
        flex-direction: column;
        font-weight: bold;
        font-size: 20px;
        line-height: 24px;
        color: rgba(41, 23, 23, 0.58) !important;
        span {
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          line-height: 23px;
        }
        &.v-tab--active {
          color: #000 !important;
        }
      }
    }

  }
}
.v-tabs {
  .v-tabs-bar__content {
    padding-bottom: 15px;
  }
  .v-tab {
    align-self: flex-end;
    flex-direction: column;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    color: #FFFFFF;
    span {
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 23px;
    }
  }
}
.v-toolbar__title {
    display: flex;
    flex-direction: row;
    width: 100%;
    white-space: normal !important;
    .v-avatar {
      margin-right: 4rem !important;
      display: block;
      overflow: visible;
      img {
        border: 3px solid #FFFFFF;
        box-sizing: border-box;
        object-fit: cover;
      }
    }
    .name {
      display: flex;
      flex-direction: column;
      span {
        font-style: normal;
        font-weight: normal;
        font-size: 10px;
        line-height: 12px;

        color: #FFFFFF;
      }
    }
    .score2 {
      align-self: flex-end;
      font-style: normal;
      font-weight: normal;
      font-size: 10px;
      line-height: 12px;
      margin-bottom: 5px;
      color: #FFFFFF;
      opacity: 0.58;
    }
}
</style>