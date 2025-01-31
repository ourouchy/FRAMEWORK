import axios from "axios";
import { Sync } from "./lib/implementations/Sync";
import { Attributes } from "./lib/implementations/Attributes";
import { Model } from "./lib/Model";
import { addPlugins } from "smooth-scrollbar/plugin";
import { Eventing } from "./lib/implementations/Eventing";
import { Collection } from "./lib/Collection";

export interface UserProps {
    id?: string;
    name?: string;
    age?: number;
}

const apiUrl = 'http://localhost:4000/users'

export class User extends Model<UserProps>{
    static buildUser(attrs: UserProps) {
        return new User(
            new Attributes<UserProps>(attrs),
            new Eventing(),
            new Sync<UserProps>(apiUrl)
        )
    }

    static buildUserCollection() {
        return new Collection<User, UserProps>
        ( 'http://localhost:4000/users',
          (json: UserProps) => User.buildUser(json)
         )
        
    }

    setRandomAge() {
        this.set(
            {age: Math.floor(Math.random() * 99 + 1)}
        )
    }
}