<template>
  <div class="splash">
    <img class="logo" src="@/static/onboarding-logo.svg" alt="Outcrowd logo" />
    <div class="logo-text">outcrowd</div>
  </div>
</template>

<script>
export default {
  layout: 'fullpage',
  head: {
    title: 'Splash',
  },
  mounted() {
    //
  },
  methods: {
    //
  }
};
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
  .logo-text {
    font-size: 24px;
    line-height: 28px;
    text-align: center;
    letter-spacing: 0.19em;
    color: #fff;
  }
}
</style>

