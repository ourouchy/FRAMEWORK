import { UserForm } from './lib/UserForm';
import { View } from './lib/View';
import { User, UserProps } from './User';
import { UserShow } from './UserShow';
import { UserList } from './UserList';

export class UserEdit extends View<User, UserProps> {
  template(): string {
    return `
      <div>
        <div class="user-list"></div>
        <div class="user-show"></div>
        <div class="user-form"></div>
      </div>`;
  }

  regionsMap(): { [key: string]: string } {
    return {
      userList: '.user-list',
      userShow: '.user-show',
      userForm: '.user-form'
    };
  }

  attachViews(): void {
    const users = User.buildUserCollection();
    users.fetch();
    users.on("change", () => {
      new UserList(this.regions.userList, users);
    });
    new UserShow(this.regions.userShow, this.model).render();
    new UserForm(this.regions.userForm, this.model).render();
  }

  eventsMap(): { [key: string]: () => void } {
    return {};
  }
}
