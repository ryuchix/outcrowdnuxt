<template>
  <div id="app">
  <v-app class="change-email">
    <v-toolbar flat fixed>
      <v-btn icon @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Change email</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <div class="ce-form mt-12">
      <v-form ref="form" lazy-validation class="mt-8" @submit.prevent="validate">
        <v-container>
          <div class="text">
            Enter your new email address, and we’ll send you verification email.
          </div>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field 
                :rules="emailRules"
                v-model="newEmail"
                name="input-10-1"
                label="New email address"></v-text-field>
            </v-col>
          </v-row>
        <v-btn type="submit" 
              :disabled="!valid"
              :loading="loading" rounded color="#E24444" dark  depressed block height="42">Confirm</v-btn>
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
  name: "ChangeEmail",
  layout: 'fullpage',
  head: {
    title: 'Change email - Settings',
  },
  middleware: 'auth',
  data() {
    return {
        newEmail: '',
        emailRules: [
          v => !!v || "E-mail is required",
          v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],
        valid: true,
        loading: false,
    };
  },
  methods: {
    validate () {
      if(this.$refs.form.validate()) {
        this.changeEmail()
      }
    },
    changeEmail() {
      this.loading = true
      const form = new FormData()
      form.append('email', this.newEmail)
      axios.post(API_URL + '/api/change-email', form, {
				headers: HEADERS(this.$auth.getToken('password_grant'))
      })
      .then(response => {
        this.loading = false
        this.$auth.fetchUser()
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
.change-email {
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
  .ce-form {
    .text {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      /* or 143% */


      color: rgba(0, 0, 0, 0.87);
    }
  }
}
</style>