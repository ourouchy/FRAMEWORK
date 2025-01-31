import axios from "axios"
import { UserProps } from "../../User";
import { HasId } from "../interfaces/HasId.interface";


export class Sync<P extends HasId> {
  constructor(public apiUrl: string){}

  fetch(id: string) {
    return axios.get(`${this.apiUrl}/${id}`)
  }

  save(data: P) {
    const {id} = data
    if(id) {
        // Mise a jour
        return axios.patch(`${this.apiUrl}/${id}`, data)
    } 
        // creation
        return axios.post(`${this.apiUrl}`, data)  
  }

}