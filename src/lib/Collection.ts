import axios from "axios";
import { Eventing } from "./implementations/Eventing";
import { User, UserProps } from "../User";

export class Collection<T, P>{
  models: T[] = [];
  events = new Eventing();

  constructor(
    public apiUrl: string,
    public deserialize: (json: P) => T
  ){}
  get on() {return this.events.on}
  get trigger() {return this.events.trigger} 

  fetch(){
    axios.get(this.apiUrl)
    .then(response => {
      response.data.forEach((data: P) => {
        const user = this.deserialize(data)
        this.models.push(user)
      })
      this.trigger('change')
    })
    
  }
}