<template>
  <v-app class="friend-request">
    <div v-if="!loading">
      <v-toolbar flat fixed>
        <v-btn icon @click="$router.back()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>Friend request</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-container fluid class="mt-5" v-if="requests != null && requests.length > 0">
        <v-row>
          <v-col cols="12" class="request-lists d-flex align-center" v-for="request in requests" :key="request.id">
            <v-avatar size="36px">
              <img @click="$router.push({path: '/profile/' + request.first_user.id})"
                :alt="request.first_user.firstname"
                :src="request.first_user.profile_image">
            </v-avatar>
            <div class="name ml-5">
              <div class="fit" v-ripple @click="$router.push({path: '/profile/' + request.first_user.id})">{{ request.first_user.firstname + ' ' + request.first_user.lastname }}</div>
            </div>
            <v-card-actions class="pt-0 pb-0 align-self-end right">
            <v-btn icon :disabled="!valid" :loading="declineLoading" @click="declineFriendRequest(request.first_user.id, index)">
              <v-icon color="#E24444">mdi-close</v-icon>
            </v-btn>
            <v-btn icon :disabled="!valid" :loading="acceptLoading" @click="acceptFriendRequest(request.first_user.id)">
              <v-icon color="#E24444">mdi-check</v-icon>
            </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
      <div v-else class="d-flex justify-center w100">Empty</div>
    </div>
  </v-app>
</template>
<script>
import { API_URL, HEADERS} from "@/store/config";
import axios from "axios";

export default {
  name: 'FriendRequest',
  layout: 'fullpage',
  head: {
    title: 'Friend request',
  },
  middleware: 'auth',
  data() {
    return {
      requests: [],
      valid: true,
      acceptLoading: false,
      declineLoading: false,
      loading: true,
    }
  },
  mounted() {
    this.loadRequest();
  },
  methods: {
    async loadRequest() {
      await axios.get(API_URL + "/api/friend-request-list", {
          headers: HEADERS(this.$auth.getToken('password_grant'))
      })
      .then(response => {
        this.requests = response.data
        this.loading = false
      })
    },
    acceptFriendRequest(id) {
      this.acceptLoading = true;
      axios.get(API_URL + "/api/accept-friend-request/" + id, {
        headers: HEADERS(this.$auth.getToken('password_grant'))
      })
      .then(response => {
        this.loadRequest();
        this.acceptLoading = false;
      })
    },
    async declineFriendRequest(id, index) {
      this.declineLoading = true;
      await axios.get(API_URL + "/api/decline-friend-request/" + id, {
        headers: HEADERS(this.$auth.getToken('password_grant'))
      })
      .then(response => {
        this.loadRequest();
        this.declineLoading = false;
      })
    }
  }
}
</script>
<style lang="scss">
  .friend-request {
    display: flex;
    margin-top: 50px;
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
    .request-lists {
      display: flex;
      align-items: center;
      .v-avatar {
        img {
          object-fit: cover;
        }
      }
      .name {
        margin-left: 20px;
        width: 100%;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 23px;
        /* or 164% */
      
        font-feature-settings: 'liga' off;

        color: #000000;

        mix-blend-mode: normal;
        opacity: 0.87;
      }
      .v-card__actions {
        text-align: right;
      }
    }
    .disabled-click {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 23px;
      /* or 164% */

      display: flex;
      align-items: center;
      text-align: center;
      font-feature-settings: 'liga' off;
    }
  }

</style>