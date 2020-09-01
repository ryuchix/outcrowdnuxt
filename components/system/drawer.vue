<template>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      width="300"
      right
      :disable-route-watcher="watcher"
      temporary>
      <v-list flat >
        <v-list-item-group color="#E24444">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-bell</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Notifications</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link  @click="$router.push({path: '/reviews'})">
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Reviews</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

        <v-list-item link @click="$router.push({path: '/settings'})">
          <v-list-item-icon>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-message-bulleted</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Send Feedback</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
  export default {
    props: ['drawer'],
    data () {
      return {
        watcher: false,
      }
    },
    methods: {
      logout() {
        this.$auth.logout()
      },
    }
  }
</script>
<style lang="scss" scoped>
  .v-list-item__content {
    margin-left: 10px;
  }
  // .v-navigation-drawer__content {
  //   .v-list-item {
  //     &:focus-within {
  //       background: #e7e7e7 !important;
  //       color: #E24444 !important;
  //     }
  //   }
  // }

</style>