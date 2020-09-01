<template>
  <div id="app">
    <v-app id="create-profile">
    <div class="heading">Create Profile</div>
    <div class="form">
      <v-form :lazy-validation="lazy" ref="cpform" v-on:submit.prevent="onSubmit" enctype="multipart/form-data">
        <v-container class="form-details">
          <div
            class="base-image-input"
            :style="{ 'background-image': `url(${imageData})` }"
            @click="chooseImage">
            <span v-if="!imageData" class="placeholder">
              <i class="material-icons">image</i>Upload image
            </span>
            <input
              accept="image/x-png, image/gif, image/jpeg"
              class="file-input"
              ref="fileInput"
              type="file"
              @input="onSelectFile"/>
          </div>
          <div v-if="errorMessage != null" class="image-error">{{ errorMessage }}</div>
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
              large
              :disabled="!valid"
              :loading="loading" 
              @click="validate"
              class="red-btn">Finish Profile</v-btn>
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
      valid: true,
      value: true,
      loading: false,
      text: "",
      timeout: 1000,
      imageData: null,
      image: '',
      errorMessage: "",
    };
  },
  mounted() {
    this.imageData = this.$auth.user.profile_image
  },
  methods: {
    onSubmit() {
      this.loading = true;
      const form = new FormData();
      form.append('profile_image', this.image);
      axios.post(API_URL+'/api/update-profileimage', form, {
				headers: HEADERS(this.$auth.getToken('password_grant'))
			}).then(response => {
        this.loading = false;
        this.loader = false;
        this.$auth.fetchUser()
        
        if (this.$auth.user.is_completed == 1) {
          this.$router.replace('/')
        }
      }).catch(err => {
        this.errorMessage = 'An error has occured!'
        this.loading = false;
        this.loader = false;
      });
    },
    validate (step) {
      this.errorMessage = ''
      if(this.image != null && this.imageData != null) {
        this.onSubmit();
      } else {
        this.errorMessage = 'Image is required'
      }
    },
    chooseImage() {
      this.$refs.fileInput.click();
    },
    onSelectFile() {
      const input = this.$refs.fileInput;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
          this.imageData = e.target.result;
        };
        this.image = files[0];
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
      }
    }
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