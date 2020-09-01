<template>
  <v-app class="content-friend">
    <div class="friends">
      <div class="requests mt-2" v-if="friends.requests != null && friends.requests.length > 0">
        <div class="request-count">Requests ({{ friends.requests.length }})</div>
        <div class="see-all">
          <v-btn @click="$router.push({path: '/friend-request'})" class="see-all" text small color="#434399">See all</v-btn>
        </div>
      </div>
      <div class="request-lists mb-5">
        <v-col cols="12" class="align-center d-flex" v-for="(request, index) in requestToDisplay" :key="index">
          <v-avatar size="36px">
            <img @click="$router.push({path: '/profile/' + request.first_user.id})" :alt="request.first_user.firstname" :src="request.first_user.profile_image">
          </v-avatar>
          <div class="name ml-5">
            <div @click="$router.push({path: '/profile/' + request.first_user.id})" class="fit" v-ripple>{{ request.first_user.firstname + ' ' + request.first_user.lastname }}</div>
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
      </div>
      <div class="incrowd d-flex justify-space-between" v-if=" friends.incrowds != null && friends.incrowds.length > 0">
        <div class="friend-count">Incrowd ({{ friends.incrowds.length }})</div>
        <div class="see-all">
          <v-btn @click="$router.push({path: '/friend-list'})" class="see-all" text small color="#434399">See all</v-btn>
        </div>
      </div>
      <div class="incrowds">
        <div class="incrowd-lists">
          <v-col cols="12" class="align-center d-flex" v-for="request in incrowdToDisplay" :key="request.id">
            <v-avatar size="36px">
              <img @click="$router.push({path: '/profile/' + request.id})" :alt="request.firstname" :src="request.profile_image">
            </v-avatar>
            <div v-ripple class="name ml-5 fit" @click="$router.push({path: '/profile/' + request.id})">{{ request.firstname + ' ' + request.lastname }}</div>
          </v-col>
        </div>
      </div>
      <div class="d-flex justify-center" v-if="friends.requests == 0 && friends.incrowds == 0">Empty</div>
    </div>
  </v-app>
</template>
<script>
import { API_URL, HEADERS} from "@/store/config";
import axios from "axios";

export default {
  name: 'ContentFriend',
  data() {
    return {
      friends: [],
      valid: true,
      acceptLoading: false,
      declineLoading: false,
    }
  },
  mounted(){
    this.loadFriends()
  },
  computed: {
    requestToDisplay: function() {
      if (this.friends.requests != null && this.friends.requests.length > 0) {
        return this.friends.requests.slice(0, 3);
      } else {
        return this.friends.requests
      }
      
    },
    incrowdToDisplay: function() {
      if (this.friends.incrowds != null && this.friends.incrowds.length > 0) {
        return this.friends.incrowds.slice(0, 7);  
      } else {
        return this.friends.incrowds
      }
    }
  },
  methods: {
    loadFriends() {
      axios.get(API_URL + "/api/load-incrowds", {
          headers: HEADERS(this.$auth.getToken('password_grant'))
      })
      .then(response => {
        this.friends = response.data;
      })
    },
    acceptFriendRequest(id) {
      this.acceptLoading = true;
      axios.get(API_URL + "/api/accept-friend-request/" + id, {
          headers: HEADERS(this.$auth.getToken('password_grant'))
      })
      .then(response => {
        this.loadFriends();
        this.acceptLoading = false;
      })
    },
    declineFriendRequest(id, index) {
      this.declineLoading = true;
      axios.get(API_URL + "/api/decline-friend-request/" + id, {
        headers: HEADERS(this.$auth.getToken('password_grant'))
      })
      .then(response => {
        this.loadFriends();
        this.declineLoading = false;
      })
    }
  }
}
</script>
<style lang="scss">
.v-application {
  &.content-friend {
    background: none;
  }
  .v-application--wrap {
    min-height: 100% !important;
  }
}
  .friends {
    .requests {
      display: flex;
      justify-content: space-between;
      .request-count {
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
    .request-lists {
      background: #FFFFFF;
      margin: 12px -12px;
      .name {
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
    .see-all {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      /* identical to box height */

      display: flex;
      align-items: center;
      text-align: right;
      text-transform: uppercase;
      /* Dark slate blue */

      color: #434399;
    }
    .incrowd {
      .friend-count {
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
    .incrowds {
      .incrowd-lists {
        background: #FFFFFF;
        margin: 12px -12px;
        .name {
          width: fit-content;
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
        img {
          width: auto;
        }
      }
    }
    .v-avatar {
      img {
        object-fit: cover;
      }
    }
  }
</style>