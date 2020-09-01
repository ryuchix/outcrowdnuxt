<template>
  <div id="app">
  <v-app class="delete-account">
    <v-toolbar flat fixed>
      <v-btn icon @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Delete account</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <div class="da-form mt-12">
      <v-form ref="form" lazy-validation class="mt-8" @submit.prevent="validate">
        <v-container>
          <div class="text">
            Enter your password to confirm deletion of your account.
          </div>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field 
                v-model="currentPass"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                @click:append="show1 = !show1"></v-text-field>
            </v-col>
          </v-row>
        <v-btn type="submit" 
              :disabled="!valid"
              :loading="loading" rounded color="#E24444" dark depressed block height="42">Delete my account</v-btn>
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
  name: "DeleteAccount",
  layout: 'fullpage',
  head: {
    title: 'Delete account - Settings',
  },
  middleware: 'auth',
  data() {
    return {
        currentPass: '',
        show1: false,
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 6 || 'Min 6 characters',
        },
        valid: true,
        loading: false,
    };
  },
  methods: {
    validate () {
      if(this.$refs.form.validate()) {
        this.deleteAccount()
      }
    },
    async deleteAccount() {
      this.loading = true
      const form = new FormData()
      form.append('password', this.currentPass)
      await axios.post(API_URL + '/api/delete-account', form, {
				headers: HEADERS(this.$auth.getToken('password_grant'))
      })
      .then(response => {
        this.$auth.logout()
        this.loading = false
        this.$router.replace({path: '/login'})
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
.delete-account {
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
  .da-form {
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