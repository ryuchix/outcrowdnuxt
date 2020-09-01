<template>
  <div>
    <v-speed-dial
      :transition="transition"
      :bottom="bottom"
      :right="right"
      :direction="direction"
      :open-on-hover="hover">
      <template v-slot:activator>
        <v-btn
          class="activity_fab"
          v-model="fab"
          fixed
          dark
          bottom
          right
          fab
          color="#E24444">
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-btn
        @click="addEvent()"
        fab
        dark
        small
        color="#E24444">
        <v-icon>mdi-calendar-text-outline</v-icon>
      </v-btn>
      <v-btn
        @click="addFriend()"
        fab
        dark
        small
        color="#E24444">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
      <v-btn
        @click="addPost()"
        fab
        dark
        small
        color="#E24444">
        <v-icon>mdi-note</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>
<script>
export default {
  data() {
    return {
      direction: 'top',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition',
    }
  },
  methods: {
    addEvent() {
      this.$router.push({path: '/events/create-event'})
    },
    addPost() {
      this.$router.push({path: '/posts/compose'})
    },
    addFriend() {
      this.$router.push({path: '/search'})
    },
  }
}
</script>
<style lang="scss">
  .activity_fab {
    bottom: 70px !important;
  }
  .v-speed-dial {
    position: fixed !important;
    .v-speed-dial__list {
      position: relative !important;
      top: -100px;
      margin-right: 5px;
    }
  }
  .v-btn--floating {
    position: relative ;
  }
</style>