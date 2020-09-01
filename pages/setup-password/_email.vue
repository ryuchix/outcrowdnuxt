<template>
  <div id="setup-password">
    <v-app>
      <div class="container">
        <div class="logo-container">
          <img src="@/static/logo.svg" alt="Outcrowd logo" />
          <div class="logo-text">outcrowd</div>
        </div>

        <div class="heading">Set up password</div>
        <Notification :message="error" v-if="errorMessage" />
        <v-form ref="form" lazy-validation v-on:submit.prevent="signUp">
          <v-text-field
            label="Password"
            :append-icon="pass1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="pass1 ? 'password' : 'text'"
            prepend-icon="lock_outline"
            name="password"
            :error-messages="errorMessage"
            v-model="password"
            class="input-group--focused"
            @click:append="pass1 = !pass1"></v-text-field>

          <v-text-field
            v-model="password_confirmation"
            label="Re-enter password"
            :append-icon="pass2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="pass2 ? 'password' : 'text'"
            prepend-icon="lock_outline"
            class="input-group--focused"
            @click:append="pass2 = !pass2"></v-text-field>

          <div class="my-3 continue-btn">
            <v-btn 
              :disabled="!valid"
              :loading="loading" 
              text 
              type="submit" large>Continue</v-btn>
          </div>
        </v-form>
      </div>

      <div class="footer"></div>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";

export default {
  layout: 'fullpage',
  head: {
    title: 'Setup Password',
  },
  middleware: 'guest',
  data() {
    return {
      email: this.$route.params.email,
      password: "",
      password_confirmation: "",
      pass1: false,
      pass2: false,
      valid: true,
      value: true,
      snackbar: false,
      text: "",
      errorMessage: '',
      loading: false,
    }
  },
  methods: {
    async signUp() {
      if (this.password == this.password_confirmation) {
        this.loading = true;
        try {
          await this.$axios.post('api/register', {
            email: this.email, 
            password: this.password, 
            password_confirmation: this.password_confirmation
          })
          .then((resp) => {
            this.$auth.setUserToken(resp.data.token)
            .then(() => {
              this.loading = false;
              this.loader = false;
              this.$router.replace({path: '/welcome'});
            })
          })
        } catch (error) {
          this.loading = false;
          this.loader = false;
        }
      } else {
        this.errorMessage = 'Password doesn\'t match';
      }
    },
  }
};
</script>
<style lang="scss" scoped>

#setup-password {
  #app {
    padding-top: 2em;
  }
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  .container {
    align-self: flex-start;
    height: 100%;
  }
  .heading {
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    color: #434399;
    margin: 50px 0 0 60px;
  }
  .logo-container {
    background: #fff;
    display: flex;
    flex-direction: column;
    .logo-text {
      font-weight: 300;
      font-size: 13px;
      line-height: 15px;
      text-align: center;
      letter-spacing: 0.19em;
      color: #E24444;
    }
  }
  .v-form {
    padding: 20px;
  }
  .v-input__prepend-outer {
    padding: 5px 15px 5px 0;
    margin-top: 0px;
  }
  .remember-me {
    margin-top: 25px;
    label {
      font-weight: normal;
      font-size: 16px !important;
      line-height: 23px;
      color: rgba(0, 0, 0, 0.54);
      padding-left: 5px;
    }
  }
  .forgot-password {
    float: right;
    margin-top: 18px;
    color: #434399;
    font-weight: normal;
    font-size: 16px !important;
    line-height: 23px;
    a {
      color: #434399;
      text-decoration: none;
    }
  }
  form {
     .continue-btn {
      width: 100%;
      float: right;
      button {
        margin-top: 20px;
        background-color: #E24444 !important;
        color: #fff;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        border-radius: 50px;
        width: 50%;
        float: right;
      }
     }
    .login-btn {
      margin: 0 auto;
      width: 100%;
      padding: 0 20px;
      .red-btn {
        width: 100%;
        background-color: #E24444 !important;
        margin-top: 20px;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        border-radius: 50px;
        box-shadow: none;
        color: #fff;

        span {
          color: #fff !important;
          font-weight: 500;
          font-size: 14px;
          line-height: 17px;
          text-align: center;
        }
      }
    }
    .v-text-field {
      margin-bottom: 10px;
    }
  }
  .divider {
    width: 100%;
    text-align: center;
    font-weight: normal;
    font-size: 14px;
    line-height: 23px;
    text-transform: uppercase;
    color: #000;
    opacity: 0.54;
    margin: 10px 0;
  }
  .social-icons {
    width: 100%;
    text-align: center;
    margin: 20px 0 20px 0;
    img {
      cursor: pointer;
    }
  }
}
.footer {
  background: require('./../static/images/footer.png');
  background-repeat: no-repeat;
  align-self: flex-end;
  height: 124px;
  text-align: center;
  background-size: cover;
  width: 100%;
  display: flex;
  justify-content: center;
  a {
    text-decoration: none;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #fff;
    display: flex;
    align-items: center;
    align-self: center;
    position: relative;
    top: 25px;
  }
}
</style>

