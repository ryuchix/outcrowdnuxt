<template>
  <div id="app">
    <v-app id="create-profile">
    <div class="heading">Create Profile</div>
    <div class="form">
      <v-form :lazy-validation="lazy" ref="cpform">
        <v-container class="form-details">
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="username"
                :error-messages="errorMessage"
                :rules="usernameRules"
                label="Username"
                type="text"
                name="username"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="firstname"
                :error-messages="errorMessage"
                :rules="fnameRules"
                label="First name"
                type="text"
                name="firstname"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="lastname"
                :error-messages="errorMessage"
                :rules="lnameRules"
                label="Last name"
                type="text"
                name="lastname"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <div class="container navigation">
          <div class="btn" style="place-content: flex-end">
            <v-btn
              :disabled="!valid"
              :loading="loading" 
              @click="validate"
              large
              class="red-btn">Continue</v-btn>
          </div>
        </div>
      </v-form>
    </div>
    </v-app>
  </div>
</template>
<script>
import { API_URL, HEADERS} from "@/store/config";
import axios from "axios";
import moment from 'moment'

export default {
  layout: 'fullpage',
  head: {
    title: 'Create profile',
  },
  middleware: 'auth',
  data() {
    return {
      user: {},
      lazy: true,
      username: "",
      firstname: "",
      lastname: "",
      valid: true,
      value: true,
      loading: false,
      errorMessage: "",
      fnameRules: [
        v => !!v || 'Firstname is required',
      ],
      lnameRules: [
        v => !!v || 'Lastname is required',
      ],
      usernameRules: [
        v => !!v || 'Username is required',
        v => this.validUsername() || 'Username must only contain alpha-numeric characters',
      ],
    };
  },
  watch: {
    date (val) {
       this.dateFormatted = moment(this.date).format('ddd, MMM D YYYY')
    },
    username (val) {
      if (val != null)
        this.username = this.username.toLowerCase().trim();
    },
  },
  mounted() {
    this.username = this.$auth.user.username
    this.firstname = this.$auth.user.firstname
    this.lastname = this.$auth.user.lastname
  },
  methods: {
    onSubmit() {
      this.loading = true;
      const form = new FormData();
      form.append('username', this.username)
      form.append('firstname', this.firstname)
      form.append('lastname', this.lastname)
      axios.post(API_URL + '/api/update-profile', form, {
				headers: HEADERS(this.$auth.getToken('password_grant'))
      })
      .then(response => {
        this.loading = false
        this.loader = false
        this.$auth.fetchUser()
        this.$router.push({path: 'step2'})
      })
      .catch(err => {
        this.errorMessage = 'An error has occured!'
        this.loading = false;
        this.loader = false;
      });
    },
    validUsername() {
      var re = /^[0-9a-z]+$/;
      return re.test(this.username);
    },
    validate () {
      if(this.$refs.cpform.validate()) {
        this.onSubmit();
      }
    },
  }
};
</script>

<style lang="scss" scoped>
#create-profile {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: flex-start;
  .heading {
    background-image: url('../../static/images/createprofile_bg.png');
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    font-feature-settings: 'liga' off;
    color: #fff;
    height: 206px;
    background-repeat: no-repeat;
    background-position: left;
    padding: 0px 10px;
  }
  .form {
    height: 100%;
    .form-details {
      padding-bottom: 100px;
    }
  }
  form {
    height: 100%;
  }
  .navigation {
    position: fixed;
    bottom: 0;
    .btn {
      display: flex;
      place-content: space-between;
    }
    .back-btn {
      background-color: #fff !important;
      margin-top: 20px;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      border-radius: 50px;
      box-shadow: none;

      span {
        color: #434399 !important;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        text-align: center;
      }
    }
    .red-btn {
      background-color: #E24444 !important;
      margin-top: 20px;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      border-radius: 50px;
      box-shadow: none;

      span {
        color: #fff !important;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        text-align: center;
      }
    }
  }
  .image-error {
    text-align: center;
    color: #E24444;
    font-size: 15px;
    margin-top: 5px;
  }
}

.base-image-input {
  display: block;
  width: 200px;
  height: 200px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
  margin: 0 auto;
  border-radius: 50%;
  margin-top: 50px;
}
.placeholder {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    #f0f0f0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 18px;
  border-radius: 50%;
}
.placeholder:hover {
  background: #e0e0e0;
}
.file-input {
  display: none;
}
</style>