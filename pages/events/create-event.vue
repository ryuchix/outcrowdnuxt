<template>
  <div id="app">
    <v-app class="create-event">
      <v-toolbar flat fixed>
        <v-btn icon @click="$router.go(-1)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Create event</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="validate" 
              :disabled="!valid"
              :loading="loading">
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </v-toolbar>

      <div class="create-event-content mt-12">
        <div
          class="base-image-input mt-3"
          :style="{ 'background-image': `url(${imageData})` }"
          @click="chooseImage">
          <span class="placeholder" :style="imageData != null ? 'background: none;' : ''">
            <i class="material-icons">image</i>Upload image
          </span>
          <input
            accept="image/x-png, image/gif, image/jpeg"
            class="file-input"
            ref="fileInput"
            type="file"
            @input="onSelectFile"/>
        </div>

        <v-form ref="form" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12">
              <v-text-field v-model="name" label="Event name" :rules="nameRules" required></v-text-field>
              </v-col>
              <v-col cols="12">
              <v-text-field v-model="location" label="Location" :rules="locationRules" required></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field 
                        v-model="computedDateFormatted"
                        label="Date"
                        readonly
                        v-bind="attrs"
                        :rules="dateRules"
                        v-on="on"
                        required></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title @input="menu2 = false"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6">
              <v-dialog
                ref="dialog"
                :close-on-content-click="false"
                v-model="eventDatePicker"
                :return-value.sync="eventTime"
                width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field 
                  readonly
                  v-bind="attrs"
                  v-on="on" 
                  v-model="eventTime" 
                  :rules="timeRules"
                  label="Time" 
                  required></v-text-field>
              </template>
              <v-time-picker
                v-if="eventDatePicker"
                v-model="eventTime"
                full-width>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="eventDatePicker = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(eventTime)">OK</v-btn>
              </v-time-picker>
            </v-dialog>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
              <v-text-field v-model="description" :rules="descriptionRules" :counter="120" label="About this event" required></v-text-field>
              </v-col>
            </v-row>
            <v-row>
            <v-list two-line width="100%">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Invite only</v-list-item-title>
                </v-list-item-content>
                <v-switch v-model="inviteOnly"></v-switch>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Guest can invite their friends</v-list-item-title>
                </v-list-item-content>
                <v-switch v-model="inviteFriendsOnly"></v-switch>
              </v-list-item>
            </v-list>
            </v-row>
          </v-container>
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
  name: "CreateEvent",
  layout: 'fullpage',
  head: {
    title: 'Create an event',
  },
  middleware: 'auth',
    data: vm => ({
      imageData: null,
      inviteOnly: false,
      inviteFriendsOnly: false,
      eventDatePicker: false,
      eventTime: null,
      valid: true,
      date: null,
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      menu2: false,
      name: '',
      location: '',
      description: '',
      loading: false,
      nameRules: [
        v => !!v || 'Event name is required',
      ],
      locationRules: [
        v => !!v || 'Event location name is required',
      ],
      descriptionRules: [
        v => !!v || 'Event Description is required',
        v => (v && v.length <= 120) || 'Only 120 characters are allowed',
      ],
      dateRules: [
        v => !!v || 'Event date is required',
      ],
      timeRules: [
        v => !!v || 'Event time is required',
      ],
      image: ''
      
  }),
  computed: {
    computedDateFormatted () {
      return this.date ? moment(this.date).format('ddd, MMM D YYYY') : ''
    },
  },
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    },
  },
  methods: {
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
    },
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    validate () {
      if(this.$refs.form.validate()) {
        this.onSubmit();
      }
    },
    onSubmit() {
      this.loading = true;
      const form = new FormData();
      form.append('name', this.name);
      form.append('location', this.location);
      form.append('date', this.computedDateFormatted);
      form.append('time', this.eventTime);
      form.append('event_date', this.date);
      form.append('event_image', this.image);
      form.append('description', this.description);
      form.append('invite_only', this.inviteOnly ? 1 : 0);
      form.append('open_invatation', this.inviteFriendsOnly ? 1 : 0);
      axios.post(API_URL + '/api/create-event', form, {
				headers: HEADERS(this.$auth.getToken('password_grant'))
      })
      .then(response => {
        this.loading = false
        this.$router.replace('/events/event/' + response.data.id)
      })
      .catch(err => {
        this.loading = false;
        this.errorMessage = 'An error has occured!';
      });
    },
  }
};
</script>
<style lang="scss">
.create-event {
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
  .create-event-content {
    .base-image-input {
      display: block;
      width: 100%;
      height: 240px;
      cursor: pointer;
      background-size: cover;
      background-position: center center;
      margin: 0 auto;
      border-radius: 0;
    }
    .placeholder {
      background: url("./../../static/images/upload-image-placeholder-min.png");
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 18px;
      border-radius: 0;
      .material-icons {
        z-index: 9999;
      }
    }
    .placeholder:hover {
      background: #e0e0e0;
    }
    .file-input {
      display: none;
    }
  }
  .v-picker {
    box-shadow: none !important;
  }
  .v-dialog {
    box-shadow: none !important;
  }
}
</style>