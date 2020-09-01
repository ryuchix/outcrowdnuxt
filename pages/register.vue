<template>
  <div id="register">
    <v-app>
      <div class="container">
        <div class="logo-container">
          <img src="@/static/logo.svg" alt="Outcrowd logo" />
          <div class="logo-text">outcrowd</div>
        </div>

        <div class="heading">Sign up</div>

        <v-form lazy-validation v-on:submit.prevent="checkEmail">
          <v-text-field
            name="email"
            v-model="email"
            :error-messages="errorMessage"
            :rules="emailRules"
            label="Email address or Username"
            prepend-icon="person_outline"></v-text-field>

          <div class="my-2 create-account">
            <v-btn
              :disabled="!valid"
              :loading="loading"
              type="submit"
              class="red-btn"
              large>Create account</v-btn>
          </div>
        </v-form>

        <div class="divider">or sign up using</div>

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
          <n-link v-ripple to="/login">Have an account? Log in instead</n-link>
      </div>
    </v-app>
  </div>
</template>
<script>
import axios from "axios";
export default {
  layout: 'fullpage',
  head: {
    title: 'Register',
  },
  middleware: 'guest',
  data() {
    return {
      email: "",
      valid: true,
      value: true,
      snackbar: false,
      text: "",
      timeout: 1000,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      errorMessage: "",
      loader: null,
      loading: false
    };
  },
  methods: {
    async checkEmail() {
      this.loading = true;
      try {
        await this.$axios.post('api/check-email', {
           email: this.email
        })
        .then(() => {
          this.loading = false;
          this.loader = false;
          this.$router.push({
            path: "setup-password/" + this.email,
          });
        })
      } catch (error) {
        this.errorMessage = 'Email already taken';
        this.loading = false;
        this.loader = false;
      }
    },
    googleLogin() {
      this.snackbar = true;
      this.text = "Google login";
    },
    facebookLogin() {
      this.snackbar = true;
      this.text = "Google login";
    }
  }
};
</script>
<style lang="scss" scoped>
#register {
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
  .create-account {
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

