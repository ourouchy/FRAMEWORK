// src/index.ts
import { UserList } from "./UserList";
import { Collection } from "./lib/Collection";
import { User } from "./User";
import { UserEdit } from "./UserEdit";

const rootElement = document.getElementById("root")!;

const users = User.buildUserCollection();
users.fetch();

users.on("change", () => {
  new UserList(rootElement, users);
});

const defaultUser = User.buildUser({ name: "John Doe", age: 30 });
new UserEdit(rootElement, defaultUser).render();