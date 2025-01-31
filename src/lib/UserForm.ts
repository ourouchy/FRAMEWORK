import { User, UserProps } from "../User"
import { View } from "./View"

export class UserForm extends View<User, UserProps>{
  template() {
    return `
    <div>
      <h1>User Form</h1>
      <label>Name: </label>
      <input /> 
      <button class="set-name">Update Name</button>
      <button class="set-age">Set Random Age</button>
      <button class="save-model">Save</button>
    </div>
    `
  }
  
  eventsMap() {
    return {
      'click:.set-age' : this.onSetAgeClick,
      'click:.set-name' : this.onSetNameClick,
      'click:.save-model' : this.onSaveClick
    }
  }

  onSetAgeClick = () => {
    this.model.setRandomAge()
    console.log("Age généré")
  }
  onSetNameClick = () => {
    const input = this.parent.querySelector('input')
    const name = input!.value
    if(name.length) {
      this.model.set({name})
    }
  }
  onSaveClick = () => {
    this.model.save()
  }

  
  


  
}