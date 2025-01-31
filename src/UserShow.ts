import { UserForm } from "./lib/UserForm";
import { View } from "./lib/View";
import { User, UserProps } from "./User";

export class UserShow extends View<User, UserProps>{
  template(): string {
    return `
    <div>
      <h1>User Details</h1>
      <div>User name: ${this.model.get('name')}</div>
      <div>User age: ${this.model.get('age')}</div>      
    </div>
    `;
  }

  eventsMap(): {[key: string]: () => void;} {
    return {}
  }

  onShowUser = () => {
    document.getElementById("user-info")!.style.display = "block";
  };
}
