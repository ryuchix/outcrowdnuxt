<template>
  <v-app-bar
    fixed
    flat
    min-height="60">
    <v-toolbar-title v-if="$route.path == '/'" >
      <img src="@/static/outcrowd.png" alt="Outcrowd">
    </v-toolbar-title>
    <v-toolbar-title v-if="$route.path == '/search'">
      Search people
    </v-toolbar-title>
    <v-toolbar-title v-if="$route.path == '/events'">
      Events
    </v-toolbar-title>
    <v-spacer></v-spacer>
  <v-app-bar-nav-icon @click.stop="openDrawer" color="#434399"></v-app-bar-nav-icon>
</v-app-bar>
</template>
<script>
export default {
  data() {
    return {
      //
    }
  },
  methods: {
    openDrawer() {
      this.$emit('drawerStatus', true)
    }
  }
}
</script>
<style lang="scss" scoped>
  .v-toolbar__title {
    color: #434399;
    font-weight: normal;
    line-height: 24px;
    display: flex;
    align-items: center;
    margin-left: 0;
  }
</style>