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
                v-model="city" 
                :error-messages="errorMessage"
                :rules="cityRules"
                type="text"
                name="city"
                label="City"></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
                <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        label="Date"
                        name="birthday"
                        readonly
                        v-model="dateFormatted"
                        :error-messages="errorMessage"
                        :rules="birthdayRules"
                        v-bind="attrs"
                        v-on="on"
                        required></v-text-field>
                    </template>
                    <v-date-picker flat="true" v-model="date" no-title @input="menu2 = false"></v-date-picker>
                </v-menu>
            </v-col>
          </v-row>
        </v-container>
        <div class="container navigation">
          <div class="btn">
            <v-btn
              @click="$router.go(-1)"
              large
              class="back-btn">
              <i class="material-icons">arrow_back</i>Back
            </v-btn>
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
      lazy: true,
      city: "",
      birthday: "",
      valid: true,
      value: true,
      loading: false,
      errorMessage: "",
      date: null,
      formatDate: '',
      eventDatePicker: false,
      dateFormatted: null,
      menu2: false,
      cityRules: [
        v => !!v || 'City is required',
      ],
      birthdayRules: [
        v => !!v || 'Birthday is required',
      ],
    };
  },
  computed: {
    computedDateFormatted () {
      return this.date ? moment(this.date).format('ddd, MMM D YYYY') : ''
    },
  },
  watch: {
    date (val) {
       this.dateFormatted = moment(this.date).format('ddd, MMM D YYYY')
    },
  },
  mounted() {
    this.city = this.$auth.user.city
    this.date = this.$auth.user.birthday
  },
  methods: {
    onSubmit() {
      this.loading = true;
      const form = new FormData();
      form.append('city', this.city);
      form.append('birthday', this.date);
      axios.post(API_URL+'/api/update-profile', form, {
				headers: HEADERS(this.$auth.getToken('password_grant'))
			}).then(response => {
        this.loading = false;
        this.loader = false;
        this.$auth.fetchUser()
        this.$router.push({path: 'step3'})
      }).catch(err => {
        this.errorMessage = 'An error has occured!'
        this.loading = false;
        this.loader = false;
      });
    },
    validate (step) {
      if(this.$refs.cpform.validate()) {
        this.onSubmit()
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
      color: #434399 !important;

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
      color: #fff !important;

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