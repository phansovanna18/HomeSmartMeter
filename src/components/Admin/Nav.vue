<template>
  <div>
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <template>
          <v-row align="center">
            <v-col cols="6">
              <v-subheader>Overview</v-subheader>
            </v-col>
          </v-row>
          <v-list-item @click="go(route.dashboard)">
            <v-list-item-action>
              <v-icon>dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">Dashboard</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider dark class="my-3"></v-divider>
          <v-row align="center">
            <v-col cols="6">
              <v-subheader>Registration</v-subheader>
            </v-col>
          </v-row>
          <v-list-item @click="go(route.register)">
            <v-list-item-action>
              <v-icon>apps</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">Register</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider dark class="my-3"></v-divider>
          <v-row align="center">
            <v-col cols="6">
              <v-subheader>User</v-subheader>
            </v-col>
          </v-row>
          <v-list-item @click="go(route.users)">
            <v-list-item-action>
              <v-icon>account_circle</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">Users</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="go(route.setting)">
            <v-list-item-action>
              <v-icon>settings</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">Setting</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">Home Smart Meter</span>
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container class="fill-height" fluid>
        <router-view />
      </v-container>
    </v-content>
    <Footer />
  </div>
</template>


<script>
import Footer from "./Footer";

export default {
  components: {
    Footer
  },
  data: () => ({
    dialog: false,
    drawer: null,
    route: {
      dashboard: "AdminDashboard",
      users: "AdminUsers",
      register: "AdminRegister",
      setting: "AdminSetting"
    }
  }),
  methods: {
    go(route) {
      if (route) this.$router.push({ name: route });
    }
  }
};
</script>