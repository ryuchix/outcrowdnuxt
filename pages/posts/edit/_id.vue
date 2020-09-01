<template>
  <div id="app">
    <v-app class="compose-post">
    <v-toolbar dense flat fixed class="compose">
      <v-btn icon color="#434399" @click="$router.go(-1)">
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <v-toolbar-title>Edit</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn  icon
              @click="validate"
              :disabled="!valid"
              :loading="loading">
        <v-icon>mdi-check</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container fluid>
      <v-row>
        <v-form
          ref="form"
          v-model="valid"
          :lazy-validation="lazy"
        >
        <v-col cols="12" md="6" >
          <v-textarea
            class="message"
            v-model="message"
            @keyup="checkLength"
            solo
            flat
            height="500"
            loader-height="10"
            name="input-7-4"
            :error-messages="errorMessage"
            :rules="postRules"
            placeholder="What’s on your mind?"
          ></v-textarea>
        </v-col>
        </v-form>
      </v-row>
    </v-container>
    <div class="compose-counter">
      <div class="counter">{{ totalcharacter }}/150</div>
    </div>
    </v-app>
  </div>
</template>
<script>
import { API_URL, HEADERS} from "@/store/config";
import axios from "axios";

export default {
  name: 'EditCompose',
  layout: 'fullpage',
  head: {
    title: 'Edit Post',
  },
  middleware: 'auth',
  data() {
    return {
      id: this.$route.params.id,
      totalcharacter: 0,
      message: '',
      valid: true,
      loading: false,
      errorMessage: "",
      lazy: false,
      postRules: [
        v => !!v || 'Message is required',
        v => (v && v.length <= 150) || 'Only 150 characters are allowed',
      ],
      post: [],
    }
  },
  async fetch() {
    await axios.get(API_URL + '/api/post/' + this.id, {
      headers: HEADERS(this.$auth.getToken('password_grant'))
    })
    .then(response => {
      const data = response.data
      this.message = data.body
      this.totalcharacter = data.body.length;
    })
  },
  methods: {
    validate () {
      if(this.$refs.form.validate()) {
        this.onSubmit();
      }
    },
    checkLength() {
      this.totalcharacter = this.message.length;
    },
    onSubmit() {
      this.loading = true
      const form = new FormData()
      form.append('body', this.message)
      axios.post(API_URL + '/api/update-post/' + this.id, form, {
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
    },
  }
}
</script>
<style lang="scss">
  .compose {
    .v-toolbar__title {
      color: #434399;
      font-weight: normal;
      line-height: 24px;
      display: flex;
      align-items: center;
      margin-left: 30px;
    }
  }
  .compose-post {
    form {
      width: 100%;
    }
  }
  .compose-counter {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #f2f2f2;
    height: 56px;
    width: 100%;
    display: flex;
    place-content: flex-end;
    padding-right: 20px;
  }
  .counter {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 23px;
    /* or 164% */

    display: flex;
    align-items: center;
    text-align: right;
    font-feature-settings: 'liga' off;

    color: rgba(0, 0, 0, 0.38);
  }

  .v-toolbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
  }
  .v-textarea {
    margin-top: 25px !important;
  }
</style>