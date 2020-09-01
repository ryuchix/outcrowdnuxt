<template>
  <div id="login">
    <v-app>
      <div class="container">
        <div class="logo-container">
          <img src="@/static/logo.svg" alt="Outcrowd logo" />
          <div class="logo-text">outcrowd</div>
        </div>

        <div class="heading">Login</div>
        <v-form lazy-validation ref="form" method="POST" @submit.prevent="validate">
          <v-text-field
            name="email"
            v-model="form.email"
            :error-messages="errorMessage"
            :rules="emailRules"
            label="Email address or Username"
            prepend-icon="person_outline"></v-text-field>

          <v-text-field
            name="password"
            v-model="form.password"
            label="Password"
            :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="() => (value = !value)"
            :type="value ? 'password' : 'text'"
            prepend-icon="lock_outline"></v-text-field>
          <div class="forgot-password" v-ripple>
            <a href="javascript:void(0)" @click="forgotPassword">Forgot password?</a>
          </div>
          <v-checkbox class="remember-me" v-model="checkbox" label="Remember me"></v-checkbox>

          <div class="my-2 login-btn">
            <v-btn :disabled="!valid" :loading="loading" type="submit" class="red-btn" large>Log in</v-btn>
          </div>
        </v-form>

        <div class="divider">or use</div>

        <div class="social-icons">
          <img @click="googleLogin" src="@/static/images/google.png" alt="Google login" />
          <img @click="facebookLogin" src="@/static/images/fb.png" alt="Facebook login" />
        </div>
      </div>

      <v-snackbar v-model="snackbar" :timeout="timeout">
        {{ text }}
        <v-btn color="blue" text @click="snackbar = false"></v-btn>
      </v-snackbar>
      <div class="footer">
        <n-link v-ripple to="/register">Don’t have an account? Sign up</n-link>
      </div>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
import { API_URL, HEADERS} from "@/store/config";

export default {
  layout: 'fullpage',
  head: {
    title: 'Login',
  },
  middleware: 'guest',
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      valid: true,
      value: true,
      snackbar: false,
      text: "",
      timeout: 1000,
      checkbox: "",
      hasErrors: false,
      errorMessage: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      loader: null,
      loading: false,
      doneLoading: false
    };
  },
  methods: {
    async signIn() {
      this.loading = true
      await this.$auth.loginWith('password_grant', {
        data: {
          grant_type: 'password',
          client_id: process.env.passport_grantid,
          client_secret: process.env.passport_grantaccess,
          scope: '',
          email: this.form.email,
          username: this.form.email,
          password: this.form.password
        }
      })
      .then(() => {
        this.loading = false
        this.loader = false
        this.$auth.redirect.profile
      }).catch((error) => {
        this.errors = [error.message];
        this.loading = false
        this.loader = false
      });
    },
    validate () {
      if(this.$refs.form.validate()) {
        this.signIn();
      }
    },
    googleLogin() {
      this.snackbar = true;
      this.text = "Google login";
    },
    facebookLogin() {
      this.snackbar = true;
      this.text = "Facebook login";
    },
    forgotPassword() {
      this.snackbar = true;
      this.text = "Forgot password";
    }
  }
};
</script>
<style lang="scss" scoped>
.footer {
  a {
    color: #fff !important;
  }
}
#login {
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
  background: url('../static/images/footer.png');
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