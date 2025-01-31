// src/UserList.ts
import { User, UserProps } from "./User";
import { Collection } from "./lib/Collection";
import { UserEdit } from "./UserEdit";

export class UserList {
  constructor(public parent: Element, public users: Collection<User, UserProps>) {
    this.render();
  }

  render(): void {
    this.parent.innerHTML = `
      <div>
      <h2>User List</h2>
      <select class="user-select">
        <option value="" disabled selected>-- Sélectionnez un utilisateur --</option>
        ${this.users.models
          .map(
            user => `<option value="${user.get('id')}">${user.get('name')}</option>`
          )
          .join('')}
      </select>
      <button class="create-user">Créer un nouvel utilisateur</button>
      <button class="refresh-list">Rafraîchir pour mettre à jour la liste</button>
    </div>
    `;
    this.bindEvents();
  }

  bindEvents(): void {
    const select = this.parent.querySelector(".user-select") as HTMLSelectElement;
    select.addEventListener("change", this.onUserSelect);
    
    const createUserButton = this.parent.querySelector(".create-user") as HTMLButtonElement;
    createUserButton.addEventListener("click", this.onCreateUser);
    
    const refreshButton = this.parent.querySelector(".refresh-list") as HTMLButtonElement;
    refreshButton.addEventListener("click", () => {
      location.reload();
    });
  }



  onUserSelect = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    if(select.value === ""){
      return;
    }
    
    const userId = select.value;
    const selectedUser = this.users.models.find(user => user.get("id") == userId);
    if (selectedUser) {
      const rootElement = document.getElementById("root")!;
      rootElement.innerHTML = "";
      new UserEdit(rootElement, selectedUser).render();
    }
  };

  onCreateUser = () => {
    const rootElement = document.getElementById("root")!;
    rootElement.innerHTML = "";
    const newUser = User.buildUser({ name: "", age: 0 });
    new UserEdit(rootElement, newUser).render();
  };
}
