<template>
  <v-app class="invite-friend">
    <v-toolbar flat fixed>
      <v-btn icon @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Invite friends</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <div class="content mt-2">
      <v-container>
        <v-text-field
          v-model="search"
          label="Search"
          prepend-icon="mdi-magnify"></v-text-field>
      </v-container>
      <v-divider
      ></v-divider>
      <v-container>
      <v-row class="mt-2">
        <v-container>
          <div class="header d-flex flex-row w100 justify-space-between">
            <div class="friend-text">
              Friends
            </div>
            <div class="invite-all text-uppercase" v-ripple @click="inviteAllFriend">
              Invite All
            </div>
          </div>
        </v-container>
        <v-col
          cols="12"
          class="friend-lists d-flex align-center pb-2 pt-2"
          v-for="(request, index) in filteredFriends"
          :key="index">
          <v-avatar size="40px">
            <img :alt="request.firstname" :src="request.profile_image" />
          </v-avatar>
          <div class="name ml-5">{{ request.firstname }} {{ request.lastname }}</div>
          <v-card-actions class="pt-0 pb-0 align-self-end right" v-if="!isAllInvited">
            <span v-ripple class="text-uppercase invited" v-if="request.isAdded">Invited</span>
            <span v-ripple class="text-uppercase invite" v-if="!request.isAdded" @click="isAdded(request.id, friends, index, true)">Invite</span>
          </v-card-actions>
          <v-card-actions class="pt-0 pb-0 align-self-end right" v-if="isAllInvited">
            <span v-ripple class="text-uppercase invited">Invited</span>
          </v-card-actions>
        </v-col>
      </v-row>
      </v-container>
    </div>
  </v-app>
</template>
<script>
import { API_URL, HEADERS} from "@/store/config";
import axios from "axios";

export default {
  name: 'InviteFriend',
  layout: 'fullpage',
  head: {
    title: 'Invite friend',
  },
  middleware: 'auth',
  data() {
    return {
      friends: [],
      isAllInvited: false,
      eventid: this.$route.params.id,
      search: '',
    }
  },
  async fetch() {
    await axios.get(API_URL + '/api/my-incrowds', {
      headers: HEADERS(this.$auth.getToken('password_grant'))
    }).then(res => {
      this.friends = res.data;
    })
  },
  computed: {
    filteredFriends() {
      return this.friends.filter(friend => {
         return this.search != null ? friend.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 : ''
      })
    }
  },
  methods: {
    isAdded(id, list, index, bool) {
      this.$set(list[index], 'isAdded', bool)
      this.inviteFriend(id)
    },
    async inviteFriend(id) {
      const form = new FormData()
      form.append('event_id', this.eventid)
      form.append('user_id', id)
      await axios.post(API_URL + '/api/event-invite-a-friend', form, {
				headers: HEADERS(this.$auth.getToken('password_grant'))
      })
    },
    async inviteAllFriend(id) {
      this.isAllInvited = true;
      const form = new FormData()
      form.append('event_id', this.eventid)
      await axios.post(API_URL+'/api/event-invite-all-friend', form, {
				headers: HEADERS(this.$auth.getToken('password_grant'))
      })
    }
  }
}
</script>
<style lang="scss">
  .invite-friend {
    .v-application--wrap {
      display: block;
    }
    .v-avatar {
      img {
        object-fit: cover;
      }
    }
    .v-toolbar {
      .v-icon {
        color: #434399;
      }
      .v-toolbar__title {
        font-style: normal;
        font-weight: normal;
        font-size: 20px;
        line-height: 24px;
        /* identical to box height */

        display: flex;
        align-items: center;

        /* Dark slate blue */

        color: #434399;
      }
    }
    .content {
      .friend-lists {
          display: flex;
          align-items: center;
          padding: 0px 12px;
          .name {
            margin-left: 20px;
            width: 100%;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 23px;
            /* or 164% */

            font-feature-settings: "liga" off;

            color: #000000;

            mix-blend-mode: normal;
            opacity: 0.87;
          }
          .v-card__actions {
            text-align: right;
          }
        }
      .invite-all {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        /* identical to box height */

        display: flex;
        align-items: center;
        text-align: right;

        /* Imperial red */

        color: #E24444;
      }
      .invited {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 23px;
        /* or 164% */

        display: flex;
        align-items: center;
        text-align: center;
        font-feature-settings: 'liga' off;

        /* Black */

        color: #000000;
        opacity: 0.54;
      }
      .invite {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 23px;
        /* or 164% */

        display: flex;
        align-items: center;
        text-align: center;
        font-feature-settings: 'liga' off;

        /* Black */

        color: #E24444;
      }
      .friend-text {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 23px;
        /* identical to box height, or 164% */

        display: flex;
        align-items: center;
        font-feature-settings: 'liga' off;

        color: rgba(0, 0, 0, 0.54);
      }
    }
  }
</style>