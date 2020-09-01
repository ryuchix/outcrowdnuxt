<template>
  <v-app>
    <div v-if="!loading" class="home-posts">
      <v-card v-for="(post, index) in posts" :key="index" class="mx-auto">
        <div class="post-type" v-if="post.post_type == 'event'">
          <v-list-item>
            <v-list-item-avatar color="grey" v-ripple>
              <img class="post-avatar" :src="post.user.profile_image" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline" v-ripple>{{ post.user.firstname }} {{ post.user.lastname }} <span>is hosting an event</span></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-img v-ripple @click="$router.push({path: '/events/event/' + post.id})" :src="post.image"
            height="194"></v-img>
          <v-card-actions>
            <div class="d-flex flex-column">
              <div class="event-title" v-ripple @click="$router.push({path: '/events/event/' + post.id})">{{ post.name }}</div>
              <div class="event-date">{{ post.date }} {{ post.time }}</div>
              <div class="event-location">{{ post.location }}</div>
            </div>
            <v-spacer></v-spacer>
            <v-btn text @click="isInterested(post.id, posts, index, star = !post.interested)">
              <v-icon v-if="post.interested" style="color: #FFB800;">{{ post.interested ? unclickStar : clickStar }}</v-icon>
              <v-icon v-if="!post.interested">{{ post.interested ? unclickStar : clickStar }}</v-icon>
            </v-btn>
          </v-card-actions>
        </div>

        <div class="post-type" v-if="post.post_type == 'post'">

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
          <v-btn icon @click="likePost(post.id, index, post.liked_count, isStar = !post.liked)" :class="{ liked: post.liked }">
            <v-icon v-if="post.liked" style="color: #E24444">mdi-heart</v-icon>
            <v-icon v-if="!post.liked">mdi-heart</v-icon>
          </v-btn>
          <div class="d-flex liked-count" :class="{ liked: post.liked }">{{ post.liked_count }}</div>
        </v-card-actions>
        </div>
      </v-card>
    </div>
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
  </v-app>
</template>
<script>
import { API_URL, HEADERS} from "@/store/config";
import axios from "axios";
import InfiniteLoading from "vue-infinite-loading";

export default {
  layout: 'Default',
  head: {
    title: 'Home Feed',
  },
  middleware: 'auth',
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
      clickStar: 'mdi-star-outline',
      unclickStar: 'mdi-star',
      interested: false,
    };
  },
  mounted() {
    this.getPosts()
  },
  methods: {
    getPosts() {
      axios.get(API_URL + "/api/posts", {
        headers: HEADERS(this.$auth.getToken('password_grant'))
      })
      .then(response => {
        const data = response.data.data
        this.posts = data
        this.loading = false
      })
      .catch(error => {})
      .finally(() => {});
    },
    loadmore($state) {
      let vm = this;
      axios.get(API_URL + "/api/posts" + "?page=" + vm.page, {
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
    likePost(id, index, count, isStar) {
      this.posts[index].liked = !this.posts[index].liked
      if (isStar) {
        this.$set(this.posts[index], 'liked_count', count + 1)
      } else {
        this.$set(this.posts[index], 'liked_count', count - 1)
      }
      this.likedPost(id)
    },
    async likedPost(id) {
      const form = new FormData()
      form.append('post_id', id)
      await axios.post(API_URL + '/api/liked-post', form, {
        headers: HEADERS(this.$auth.getToken('password_grant'))
      })
    },
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
};
</script>
<style lang="scss">
.v-dialog {
  box-shadow: none !important;
  .v-card {
    box-shadow: none !important;
  }
}
</style>
<style lang="scss" scoped>
.v-application {
  background: transparent;
  margin-top: 60px;
  margin-bottom: 60px;
  padding: 12px;
  .v-sheet {
    box-shadow: none;
  }
}
.v-card {
  margin-bottom: 10px;
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
    span {
      font-weight: normal;
      font-size: 14px;
      line-height: 23px;
      /* or 164% */

      font-feature-settings: 'liga' off;

      color: #000000;

      mix-blend-mode: normal;
      opacity: 0.54;
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
.home-posts {
  .event-title {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: #000000;
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