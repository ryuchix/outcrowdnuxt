<template>
  <v-app class="content-friend">
    <div class="friends">
      <div class="incrowd d-flex justify-space-between" v-if=" friends.incrowds != null && friends.incrowds.length > 0">
        <div class="friend-count">Incrowd ({{ friends.incrowds.length }})</div>
      </div>
      <div class="incrowds">
        <div class="incrowd-lists">
          <v-col cols="12" class="align-center d-flex" v-for="request in friends.incrowds" :key="request.id">
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
      id: this.$route.params.id,
    }
  },
  mounted(){
    this.loadFriends()
  },
  methods: {
    loadFriends() {
      axios.get(API_URL + "/api/users-incrowds/" + this.id, {
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