import { IPerson } from "@/interfaces/person.interface";
import http from "./http-common";

class PersonService {
  getAll() {
    return http.get("/users/all");
  }

  create(user: IPerson) {
    return http.post("/users/add", user);
  }

  update(id: string, data: any) {
    return http.put(`/users/${id}`, data);
  }
  delete(id: string) {
    return http.delete(`/users/${id}`);
  }
}

export default new PersonService();
