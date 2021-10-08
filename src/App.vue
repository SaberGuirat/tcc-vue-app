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
        href="https://github.com/SaberGuirat/tcc-vue-app"
        target="_blank"
        text
      >
        <span class="mr-2">Github</span>
        <v-icon> mdi-github </v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <UsersTable
        :persons="persons"
        :headers="headers"
        :addUser="addUser"
        :deleteUser="deleteUser"
        :updateUser="updateUser"
      />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import UsersTable from "./components/UsersTable.vue";
import Component from "vue-class-component";
import { IPerson } from "./interfaces/person.interface";
import PersonService from "./services/person.services";

@Component({
  components: {
    UsersTable,
  },
})
export default class App extends Vue {
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
  persons: IPerson[] = [];

  getAllUsers() {
    PersonService.getAll()
      .then((response) => {
        console.log(response.data);
        this.persons = response.data;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  addUser(person: IPerson) {
    PersonService.create(person)
      .then((response) => {
        this.persons.push(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteUser(id: string) {
    PersonService.delete(id)
      .then((response: any) => {
        this.persons = this.persons.filter(
          (person) => person._id !== response.data._id
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateUser(id: string, person: IPerson) {
    PersonService.update(id, person)
      .then((response: any) => {
        this.persons = this.persons.map((person) => {
          return person._id === response.data._id ? response.data : person;
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  mounted() {
    this.getAllUsers();
  }
}
</script>
