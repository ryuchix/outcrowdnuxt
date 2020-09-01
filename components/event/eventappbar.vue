<template>
  <v-app-bar fixed flat min-height="60">
    <v-btn icon @click="$router.replace({path: '/profile/' + $route.params.id})" v-if="$route.name == 'profile-event-interested-id'">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-btn icon @click="$router.go(-1)" v-else>
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>
<script>
export default {
  props: ['title']
}
</script>
<style lang="scss" scoped>
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
    margin-left: 0;
  }
</style>