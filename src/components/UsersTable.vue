<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="persons" :search="search">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Users Infos</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Add User
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field
                          v-model="editedPerson.firstName"
                          label="First Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field
                          v-model="editedPerson.lastName"
                          label="Last Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="6">
                        <v-text-field
                          v-model="editedPerson.email"
                          label="Email"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this User?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deletePersonConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editPerson(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deletePerson(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { IPerson } from "../interfaces/person.interface";

@Component({
  props: {
    persons: Array as () => IPerson[],
    headers: Array,
    addUser: Function,
    deleteUser: Function,
    updateUser: Function,
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
})
export default class UsersTable extends Vue {
  persons: IPerson[];
  editedIndex = -1;
  editedPerson: IPerson = {
    firstName: "",
    lastName: "",
    email: "",
  };
  defaultPerson: IPerson = {
    firstName: "",
    lastName: "",
    email: "",
  };
  dialog = false;
  dialogDelete = false;

  data() {
    return {
      search: "",
    };
  }

  get formTitle() {
    return this.editedIndex === -1 ? "Add User" : "Edit User";
  }

  editPerson(person: IPerson) {
    this.editedIndex = this.persons.indexOf(person);
    this.editedPerson = Object.assign({}, person);
    this.dialog = true;
  }

  deletePerson(person: IPerson) {
    this.editedIndex = this.persons.indexOf(person);
    this.editedPerson = Object.assign({}, person);
    this.dialogDelete = true;
  }

  deletePersonConfirm() {
    this.$props.deleteUser(this.persons[this.editedIndex]._id);
    this.closeDelete();
  }

  close() {
    this.dialog = false;
    this.$nextTick(() => {
      this.editedPerson = Object.assign({}, this.defaultPerson);
      this.editedIndex = -1;
    });
  }

  closeDelete() {
    this.dialogDelete = false;
    this.$nextTick(() => {
      this.editedPerson = Object.assign({}, this.defaultPerson);
      this.editedIndex = -1;
    });
  }

  save() {
    if (this.editedIndex > -1) {
      this.$props.updateUser(
        this.persons[this.editedIndex]._id,
        this.editedPerson
      );
    } else {
      this.$props.addUser(this.editedPerson);
    }
    this.close();
  }

  initialize() {
    this.persons = [];
  }
}
</script>
