import { mount, createLocalVue } from "@vue/test-utils";
import UsersTable from "@/components/UsersTable.vue";
import Vue from "vue";
import Vuetify from "vuetify";
import { IPerson } from "@/interfaces/person.interface";

const persons: IPerson[] = [
  {
    _id: "123",
    firstName: "saber",
    lastName: "Guirat",
    email: "saber.guirat92@gmail.com",
  },
];

const headers = [
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
const addUser = (person: IPerson) => {
  console.log("add user");
};
const deleteUser = () => {
  console.log("delete user");
};
const updateUser = () => {
  console.log("update user");
};

describe("UsersTable.vue", () => {
  const localVue = createLocalVue();
  let vuetify: any;
  Vue.use(Vuetify);

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const mountFunction = (options: any) => {
    return mount(UsersTable, {
      localVue,
      vuetify,
      ...options,
    });
  };

  it("renders props when passed", async () => {
    const wrapper = mountFunction({
      propsData: { headers, persons, addUser, deleteUser, updateUser },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
