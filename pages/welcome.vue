<template>
  <div class="welcome container">
    <div class="logo">
      <img src="@/static/onboarding-logo.svg" alt="Outcrowd logo" />
      <div class="logo-text">outcrowd</div>
    </div>
    <div class="heading">
      <h1>Welcome to Outcrowd!</h1>
      <p>Let's create your profile now.</p>
    </div>
    <div class="my-2 cta">
      <v-btn @click="$router.replace({path: 'steps/step1'})" large>Proceed</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'fullpage',
  head: {
    title: 'Welcome to Outcrowd',
  },
  middleware: 'auth',
};
</script>
<style lang="scss" scoped>
.welcome {
  background: linear-gradient(180deg, #E24444 0%, #434399 100%), url('./../static/images/welcome.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  background-blend-mode: hard-light, normal;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  .cta {
    width: 40%;
  }
  .logo {
    display: flex;
    flex-direction: column;
  }
  img {
    width: 81px;
    height: 81px;
  }
  .welcome-overlay {
    width: auto;
  }
  .logo-text {
    font-size: 14px;
    line-height: 28px;
    text-align: center;
    letter-spacing: 0.19em;
    color: #fff;
  }
  h1 {
    font-size: 45px;
    line-height: 53px;
    text-align: center;
    color: #fff;
  }
  p {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #fff;
  }
  button {
    margin-top: 20px;
    background-color: #E24444 !important;
    color: #fff;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    border-radius: 50px;
    width: 100%;
    span {
      color: #fff;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      text-align: center;
    }
  }
}
</style>

