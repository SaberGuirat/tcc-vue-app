<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify firstName"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>{{ name }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <UsersTable :persons="persons" :headers="headers" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import UsersTable from "./components/UsersTable.vue";
import Component from "vue-class-component";
import { IPerson } from "./interfaces/person.interface";

@Component({
  components: {
    UsersTable,
  },
})
export default class App extends Vue {
  name : string = "App";
  headers = [
    {
      text: "ID",
      align: "start",
      filterable: true,
      value: "_id",
    },
    { text: "First Name", value: "firstName" },
    { text: "Last Name", value: "lastName" },
    { text: "Email", value: "email" },
    { text: "Actions", value: "actions", sortable: false },
  ];
  persons : IPerson[]= [
    {
      _id: "1",
      firstName: "Frozen Yogurt",
      lastName: "Frozen Yogurt@sdsdd.sdsd",
      email: "Frozen Yogurt@sdsdd.sdsd",    },
    {
      _id: "1",
      firstName: "Ice cream sandwich",
      lastName: "Frozen Yogurt",
      email: "Frozen Yogurt@sdsdd.sdsd",

    },
    {
      _id: "1",
      firstName: "Eclair",
      lastName: "Frozen Yogurt",

      email: "Frozen Yogurt@sdsdd.sdsd",
    },
    {
      _id: "1",
      firstName: "Cupcake",
      lastName: "Frozen Yogurt",
      email: "Frozen Yogurt@sdsdd.sdsd",

    },
    {
      _id: "1",
      firstName: "Gingerbread",
      lastName: "Frozen Yogurt",

      email: "Frozen Yogurt@sdsdd.sdsd",
    },
    {
      _id: "1",
      firstName: "Jelly bean",
      lastName: "Frozen Yogurt",
      email: "Frozen Yogurt@sdsdd.sdsd",

    },
    {
      _id: "1",
      firstName: "Lollipop",
      lastName: "Frozen Yogurt",
      email: "Frozen Yogurt@sdsdd.sdsd",

    },
    {
      _id: "1",
      firstName: "Honeycomb",
      lastName: "Frozen Yogurt",

      email: "Frozen Yogurt@sdsdd.sdsd",
    },
    {
      _id: "1",
      firstName: "Donut",
      lastName: "Frozen Yogurt",

      email: "Frozen Yogurt@sdsdd.sdsd",
    },
    {
      _id: "1",
      firstName: "KitKat",
      lastName: "Frozen Yogurt",
      email: "Frozen Yogurt@sdsdd.sdsd",
    },
  ];
}
</script>
