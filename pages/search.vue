<template>
  <v-app class="search">
    <div class="content mt-2">
      <v-container>
          <v-text-field
            autocomplete="off"
            v-model="search"
            label="Search"
            prepend-icon="mdi-magnify"></v-text-field>
      <v-divider></v-divider>
      </v-container>
      <v-container>
      <v-row class="mt-2">
        <v-container>
          <div class="header d-flex flex-row w100 justify-space-between">
            <div class="friend-text">
              Recommended
            </div>
          </div>
        </v-container>
        <div class="d-flex justify-center w100"> 
          <v-progress-circular v-if="searchLoading" indeterminate color="blue-grey"></v-progress-circular>
        </div>
        <v-col
          cols="12"
          class="friend-lists d-flex align-center pb-2 pt-2"
          v-for="(request, index) in recommended"
          :key="index">
          <v-avatar size="40px" v-ripple @click="$router.push({path: '/profile/' + request.id})">
            <img :alt="request.firstname" :src="request.profile_image" />
          </v-avatar>
          <div class="name ml-5" v-ripple @click="$router.push({path: '/profile/' + request.id})">{{ request.firstname }} {{ request.lastname }}</div>
          <v-card-actions class="pt-0 pb-0 align-self-end right" v-if="!isAllInvited">
            <span v-ripple class="text-uppercase invited" v-if="request.isAdded">Added</span>
            <span v-ripple class="text-uppercase invite" v-if="!request.isAdded" @click="isAdded(request.id, recommended, index, true)">Add</span>
          </v-card-actions>
        </v-col>
        <div class="w100 d-flex justify-center" v-if="recommended == null">0 person found</div>
      </v-row>
      </v-container>
    </div>
  </v-app>
</template>
<script>
import { API_URL, HEADERS} from "@/store/config";
import axios from "axios";
import InfiniteLoading from "vue-infinite-loading";

export default {
  name: 'Search',
  layout: 'Default',
  head: {
    title: 'Search people',
  },
  middleware: 'auth',
  components: {
    InfiniteLoading
  },
  data() {
    return {
      recommended: [],
      search: '',
      isAllInvited: false,
      page: 2,
      loading: true,
      searchLoading: false,
    }
  },
  watch: {
    search(val) {
      if (val.length > 3) {
        this.searchPost()
      }
      if (this.search == '') {
        this.$fetch()
      }
    }
  },
  async fetch() {
    await axios.get(API_URL+'/api/load-users', {
      headers: HEADERS(this.$auth.getToken('password_grant'))
    }).then(res => {
      this.recommended = res.data;
      this.loading = false
      this.searchLoading = false
    })
  },
  computed: {
    filteredFriends() {
      return this.recommended.filter(friend => {
         return this.search != null ? friend.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 : ''
      })
    }
  },
  methods: {
    isAdded(id, list, index, bool) {
      this.$set(list[index], 'isAdded', bool)
      this.addFriend(id)
    },
    async addFriend(id) {
      await axios.get(API_URL + "/api/send-friend-request/" + id, {
        headers: HEADERS(this.$auth.getToken('password_grant'))
      })
    },    
    async searchPost() {
      this.searchLoading = true
      this.recommended = []
      const form = new FormData()
      form.append('search', this.search)
      await axios.post(API_URL + '/api/search-users', form, {
        headers: HEADERS(this.$auth.getToken('password_grant'))
      })
      .then(response => {
        this.recommended = response.data
        this.searchLoading = false
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.v-application {
  background: #fff;
  margin-top: 60px;
  margin-bottom: 50px;
  padding: 12px;
  .v-sheet {
    box-shadow: none;
  }
}
</style>
<style lang="scss">
  .search {
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