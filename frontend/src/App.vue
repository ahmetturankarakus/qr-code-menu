<template>
  <div id="app">
    <div v-if="isBranch">
      <AdminHeader />
      <router-view />
    </div>
    <AppHeader v-else/>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import AdminHeader from "./components/AdminHeader.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AdminHeader
  },
  computed: {
    isBranch() {
      return this.$route.path === '/branch' || /^\/category\/\d+$/.test(this.$route.path) ||this.$route.path === '/products'||this.$route.path === '/qr-code'||/^\/qr-code\/\d+$/.test(this.$route.path)
    }
  }
};
</script>

<style>
body{
  padding: 1%;
}
</style>

