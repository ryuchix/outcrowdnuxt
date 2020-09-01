<template>
<div v-if="!loading" id="otehr-footer">

  <v-bottom-navigation
    class="has-sent-friend-request"
    v-if="user.has_pending_approval"
    light
    background-color="#E24444"
    fixed>
    <v-btn
    :disabled="!valid"
    :loading="btnDecline"
    @click="declineFriendRequest"
    width="fit-content">
    Decline
    </v-btn>
    <v-btn 
    :disabled="!valid"
    :loading="btnloading"
    @click="acceptFriendRequest"
    width="fit-content">
    Accept friend request
    </v-btn>

  </v-bottom-navigation>
  <v-bottom-navigation
    class="add-friend-request"
    v-if="!user.has_pending_request && !user.has_pending_approval && !user.is_friend"
    light
    background-color="#E24444"
    fixed>
    <v-btn 
    :disabled="!valid"
    :loading="btnloading"
    @click="addAsFriend"
    width="100%">
      <v-icon>mdi-account-plus</v-icon>
    Add as friend
    </v-btn>

  </v-bottom-navigation>
  <v-bottom-navigation
    class="cancel-friend-request"
    v-if="user.has_pending_request"
    light
    background-color="#bdbdbd"
    fixed>
    <v-btn
    :disabled="!valid"
    :loading="btnloading"
    @click="cancelFriendRequest"
    width="100%">
      <v-icon>mdi-account-plus</v-icon>Cancel friend request</v-btn>

  </v-bottom-navigation>
</div>

</template>
<script>
import { API_URL, HEADERS} from "@/store/config";
import axios from "axios";

export default {
  name: 'UserFooter',
  components: {
      //
  },
  props: ['user', 'loading'],
  data() {
      return {
        id: this.$route.params.id,
        valid: true,
        btnloading: false,
        btnDecline: false,
      }
  },
  methods: {
    async addAsFriend() {
      this.btnloading = true;
      await axios.get(API_URL + "/api/send-friend-request/" + this.id, {
        headers: HEADERS(this.$auth.getToken('password_grant'))
      })
      .then(response => {
        this.$emit('fetchNewData', null)
        this.btnloading = false;
      })
      .catch(error => {this.btnloading = false;})
    },
    async cancelFriendRequest() {
      this.btnloading = true;
      await axios.get(API_URL + "/api/cancel-friend-request/" + this.id, {
        headers: HEADERS(this.$auth.getToken('password_grant'))
      })
      .then(response => {
        this.$emit('fetchNewData', null)
        this.btnloading = false;
      })
      .catch(error => {this.btnloading = false;})
    },
    async declineFriendRequest() {
      this.btnDecline = true;
      await axios.get(API_URL + "/api/decline-friend-request/" + this.id, {
        headers: HEADERS(this.$auth.getToken('password_grant'))
      })
      .then(response => {
        this.$emit('fetchNewData', null)
        this.btnDecline = false;
      })
      .catch(error => {this.btnDecline = false;})
    },
    async acceptFriendRequest() {
      this.btnloading = true;
      await axios.get(API_URL + "/api/accept-friend-request/" + this.id, {
        headers: HEADERS(this.$auth.getToken('password_grant'))
      })
      .then(response => {
        this.$emit('fetchNewData', null)
        this.btnloading = false;
      })
      .catch(error => {this.btnloading = false;})
    }
  }
}
</script>
<style lang="scss">
// #home-footer {
//   display: none;
//   .v-speed-dial {
//     display: none;
//   }
// }
  .activity_fab {
    bottom: 70px !important;
  }
  .add-as-friend {
    .v-btn__content {
      width: 100%;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      /* identical to box height */
      color: #FFFFFF;
      text-transform: uppercase;
      flex-direction: row !important;
    }
    .v-btn {
      max-width: 100% !important;
    }
  }
  .add-friend-request {
    .v-btn__content {
      width: 100%;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      /* identical to box height */
      color: #fff;
      text-transform: uppercase;
      flex-direction: row !important;
      .v-icon {
        margin-right: 10px;
      }
    }
    .v-btn {
      max-width: 100% !important;
    }
  }
  .has-sent-friend-request {
    display: flex;
    justify-content: space-between !important;
    .v-btn__content {
      width: 100%;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      /* identical to box height */
      color: #fff;
      text-transform: uppercase;
      flex-direction: row !important;
      .v-icon {
        margin-right: 10px;
      }
    }
    .v-btn {
      max-width: 100% !important;
    }
  }
  .cancel-friend-request {
    .v-btn {
      max-width: 100% !important;
      .v-btn__content {
        flex-direction: row !important;
        text-transform: uppercase;
        color: #4F4F4F;
        i {
          padding-right: 10px;
        }
      }
    }

  }
</style>