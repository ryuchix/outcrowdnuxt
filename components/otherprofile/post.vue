<template>
  <div v-if="!loading">
    <v-card v-for="(post, index) in posts" :key="index" class="mx-auto">
      <v-list-item>
        <v-list-item-avatar color="grey" v-ripple @click="$router.push({path: '/profile/' + post.user_id})">
          <img class="post-avatar" :src="post.user.profile_image" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title @click="$router.push({path: '/profile/' + post.user_id})" class="headline" v-ripple>{{ post.user.firstname }} {{ post.user.lastname }}</v-list-item-title>
          <v-list-item-subtitle>{{ post.created_at }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-spacer></v-spacer>
        <v-menu
          v-if="post.self"
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
            <v-list-item @click="$router.push({path: 'posts/edit/' + post.id})">
              <v-list-item-title>Edit post</v-list-item-title>
            </v-list-item>
            <v-list-item @click.stop="openDialog(post.id, index)">
              <v-list-item-title>Delete</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list-item>
      <v-card-text>{{ post.body }}</v-card-text>
      <v-card-actions>
        <v-btn icon @click="likePost(post.id, index)" :class="{ liked: post.liked }">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <div class="d-flex liked-count" :class="{ liked: post.liked }">{{ post.liked_count }}</div>
      </v-card-actions>
    </v-card>
    <infinite-loading v-if="!loading" spinner="waveDots" @infinite="loadmore">
    </infinite-loading>
    <v-dialog light v-model="confirmDelete" max-width="290">
      <v-card>
        <v-card-title class="headline">Confirmation</v-card-title>
        <v-card-text>Are you sure you want to delete this post?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="confirmDelete = false">Cancel</v-btn>
          <v-btn
            :disabled="!valid"
            :loading="deleteloading"
            color="green darken-1"
            text
            @click="deletePost">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { API_URL, HEADERS} from "@/store/config";
import InfiniteLoading from "vue-infinite-loading";
import axios from "axios";

export default {
  name: 'ContentPost',
  components: {
    InfiniteLoading
  },
  data() {
    return {
      items: [{ title: "Edit Post" }, { title: "Delete" }],
      closeOnContentClick: true,
      posts: [],
      loading: true,
      confirmDelete: false,
      postid: null,
      postindex: null,
      valid: true,
      deleteloading: false,
      color: "undefined",
      isActive: false,
      page: 2,
      id: this.$route.params.id,
    }
  },
  mounted() {
    this.getPosts()
  },
  methods: {
    async getPosts() {
      await axios.get(API_URL + "/api/user-posts/" + this.id, {
        headers: HEADERS(this.$auth.getToken('password_grant'))
      })
      .then(response => {
        const data = response.data.data
        this.posts = data
        this.loading = false
      })
    },
    loadmore($state) {
      let vm = this;
      axios.get(API_URL + "/api/user-posts/" + this.id + "?page=" + vm.page, {
        headers: HEADERS(this.$auth.getToken('password_grant'))
      })
      .then(response => {
        response.data.data.map(function(value) {
          vm.posts.push(value)
        });
        if ((vm.page - 1) == response.data.last_page) {
          $state.complete()
        }
        vm.page += 1
        $state.loaded()
      })
      .catch(error => console.log(error))
      .finally(() => console.log())
    },
    openDialog(id, index) {
      this.confirmDelete = true
      this.postid = id
      this.postindex = index
    },
    deletePost() {
      this.deleteloading = true
      const form = new FormData()
      form.append('id', this.postid)
      axios.post(API_URL + '/api/delete-post', form, {
        headers: HEADERS(this.$auth.getToken('password_grant'))
      })
      .then(response => {
        this.deleteloading = false
        this.$delete(this.posts, this.postindex)
        this.$auth.fetchUser()
        this.confirmDelete = false
      })
      .catch(err => {
        this.deleteloading = false
      });
    },
    likePost(id, index) {
      this.posts[index].liked = !this.posts[index].liked
    }
  }
}
</script>
<style>
.v-dialog {
  box-shadow: none !important;
}
</style>
<style scoped lang="scss">
.v-card {
  margin-bottom: 10px;
  box-shadow: none !important;
  .v-list-item__title {
    &.headline {
      font-weight: 500;
      font-size: 14px !important;
      line-height: 17px;
      width: fit-content;
      color: #000000;

      mix-blend-mode: normal;
      opacity: 0.87;
    }
  }
  .v-list-item__subtitle {
    font-weight: normal;
    font-size: 14px;
    line-height: 23px;
    /* or 164% */

    display: flex;
    align-items: center;
    font-feature-settings: "liga" off;

    color: #000000;

    mix-blend-mode: normal;
    opacity: 0.54;
  }
  .post-avatar {
    object-fit: cover;
  }
}
.liked {
  color: #e24444 !important;
}
.liked-count {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 23px;
  /* identical to box height, or 164% */
  display: flex;
  align-items: center;
  font-feature-settings: "liga" off;
}
</style>