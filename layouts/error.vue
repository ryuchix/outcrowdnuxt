<template>
  <v-app>
    <div class="splash">
      <h1 v-if="error.statusCode === 404" class="d-flex flex-column align-center">
        <div>
        {{ pageNotFound }}
        </div>
        <NuxtLink to="/">
          Return to homepage
        </NuxtLink>
      </h1>
      <h1 v-else class="d-flex flex-column align-center">
        {{ otherError }}
        <NuxtLink :to="$router.go()">
          Reload the page
        </NuxtLink>
      </h1>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'fullpage',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style lang="scss" scoped>
.splash {
  height: 100vh;
  width: 100%;
  background: linear-gradient(180deg, #E24444 0%, #434399 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 200px;
  color: #fff;
  a {
  color: #fff;
    font-size: 20px !important;
  }
  .logo-text {
    font-size: 24px;
    line-height: 28px;
    text-align: center;
    letter-spacing: 0.19em;
    color: #fff;
  }
}
</style>
