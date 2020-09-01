<template>
<v-dialog light v-model="confirmDelete" max-width="290">
  <v-card>
    <v-card-title class="headline">{{ confirmation }}</v-card-title>
    <v-card-text>{{ title }}</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" text @click="confirm = false">{{ button_cancel }}</v-btn>
      <v-btn :disabled="!valid" :loading="loading" color="green darken-1" text @click="dialogAction">{{ button_ok }}</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>
<script>
export default {
  name: 'Dialog',
  props: ['confirmation', 'title', 'loading', 'button_ok', 'button_cancel','dialog_action','confirm'],
  data() {
    return {
      confirm: false,
      valid: true,
    };
  },
  methods: {
    dialogAction() {
      this.loading = true
      this.$emit('dialog_action', 1)
    }
  }
}
</script>