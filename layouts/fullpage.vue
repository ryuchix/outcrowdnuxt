<template>
  <div>
    <nuxt />
  </div>
</template>
<script>
import Echo from "laravel-echo"
import Pusher from 'pusher-js'

export default {
  methods: {
    openDrawer() {
      this.drawer = false;
      if (!this.drawer)
        this.drawer = true;
      else
        this.drawer = false;
    },
  }
}
</script>