<template>
  <div id="app">
    <v-app class="settings">
      <v-toolbar flat fixed>
        <v-btn icon @click="$router.back()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <div class="setting-content mt-12">
        <v-list two-line subheader>
          <v-subheader>General</v-subheader>

          <v-list-item link @click.stop="openVerifyEmail = true">
            <v-list-item-content>
              <v-list-item-title>Verify email address</v-list-item-title>
              <v-list-item-subtitle>Your account is not yet verified.</v-list-item-subtitle>
              <v-btn icon absolute right>
                <v-icon color="red">mdi-alert</v-icon>
              </v-btn>
              <v-btn icon absolute right>
                <v-icon color="red">mdi-check</v-icon>
              </v-btn>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click="$router.push({path: '/settings/change-email'})">
            <v-list-item-content>
              <v-list-item-title>Change email address</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click="$router.push({path: '/settings/change-password'})">
            <v-list-item-content>
              <v-list-item-title>Change password</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Private account</v-list-item-title>
              <v-list-item-subtitle>Only your friends can see your posts</v-list-item-subtitle>
            </v-list-item-content>
            <v-switch v-model="privateAccount"></v-switch>
          </v-list-item>
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>Blocked Users</v-list-item-title>
              <v-list-item-subtitle>No Users are currently blocked</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Push notifications</v-list-item-title>
            </v-list-item-content>
            <v-switch v-model="pushNotification"></v-switch>
          </v-list-item>
          <v-list-item link @click="$router.push({path: '/settings/delete-account'})">
            <v-list-item-content>
              <v-list-item-title class="delete-account">Delete Account</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-subheader>About the app</v-subheader>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Version</v-list-item-title>
              <v-list-item-subtitle>1.0.1</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>Terms of Service</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>Privacy Policy</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Clear cache</v-list-item-title>
              <v-list-item-subtitle>8 mb</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-dialog v-if="openVerifyEmail" v-model="openVerifyEmail" persistent max-width="290">
          <v-card>
            <v-card-title class="headline"></v-card-title>
            <v-card-text>We have sent a verification email to {{ $auth.user.email }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="openVerifyEmail = false">Okay</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </div>
    </v-app>
  </div>
</template>
<script>
export default {
  name: "Settings",
  layout: 'fullpage',
  head: {
    title: 'Settings',
  },
  middleware: 'auth',
  data() {
    return {
      privateAccount: false,
      pushNotification: false,
      openVerifyEmail: false,
    };
  }
};
</script>
<style lang="scss">
.settings {
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
  .setting-content {
    .subheading {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      /* identical to box height */

      display: flex;
      align-items: center;

      /* Dark slate blue */

      color: #434399;
    }
    .delete-account {
      color: #e24444 !important;
    }
    .v-list-item__title {
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 19px;
      color: #000000;
      mix-blend-mode: normal;
      opacity: 0.87;
    }
    .v-subheader {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      /* identical to box height */

      display: flex;
      align-items: center;

      /* Dark slate blue */

      color: #434399;
    }
    .v-list-item__subtitle {
      font-style: normal;
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
  }
  .v-dialog {
    box-shadow: none;
    .v-card__text {
      font-style: normal;
      font-weight: normal;
      font-size: 16px !important;
      line-height: 19px;

      color: rgba(0, 0, 0, 0.541327);
    }
  }

}
</style>