<template>
  <div id="app">
  <v-app class="change-password">
    <v-toolbar flat fixed>
      <v-btn icon @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Change password</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon 
              @click="validate"
              :disabled="!valid"
              :loading="loading">
        <v-icon>mdi-check</v-icon>
      </v-btn>
    </v-toolbar>

    <div class="cp-form mt-12">
      <v-form ref="form" lazy-validation @submit.prevent="changePassword">
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field 
                v-model="currentPass"
                prepend-icon="mdi-lock-outline"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Current password"
                counter
                @click:append="show1 = !show1"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field 
                v-model="newPass"
                prepend-icon="mdi-lock-outline"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="New password"
                counter
                @click:append="show1 = !show1"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field 
                v-model="confirmPass"
                prepend-icon="mdi-lock-outline"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Confirm new password"
                counter
                @click:append="show1 = !show1"></v-text-field>
            </v-col>
          </v-row>
          <div class="forgot-password" v-ripple>
            Forgot password?
          </div>
        </v-container>
      </v-form>
    </div>
  </v-app>
  </div>
</template>
<script>
import { API_URL, HEADERS} from "@/store/config";
import axios from "axios";

export default {
  name: "ChangePassword",
  layout: 'fullpage',
  head: {
    title: 'Change password - Settings',
  },
  middleware: 'auth',
  data() {
    return {
        show1: false,
        show2: true,
        show3: false,
        show4: false,
        currentPass: '',
        newPass: '',
        confirmPass: '',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 6 || 'Min 6 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),
        },
        valid: true,
        loading: false,
    };
  },
  methods: {
    validate () {
      if(this.$refs.form.validate()) {
        this.changePassword()
      }
    },
    async changePassword() {
      this.loading = true
      const form = new FormData()
      form.append('password', this.currentPass)
      form.append('new_password', this.newPass)
      form.append('password_confirmation', this.confirmPass)
      await axios.post(API_URL + '/api/change-password', form, {
				headers: HEADERS(this.$auth.getToken('password_grant'))
      })
      .then(response => {
        this.loading = false
        this.$router.go(-1)
      })
      .catch(err => {
        this.loading = false
        this.errorMessage = 'An error has occured!'
      });
    }
  }
};
</script>
<style lang="scss">
.change-password {
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
  .cp-form {
    .forgot-password {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 23px;
      /* identical to box height, or 164% */

      display: flex;
      align-items: center;
      text-align: center;
      font-feature-settings: 'liga' off;

      color: #434399;
    }
  }
}
</style>