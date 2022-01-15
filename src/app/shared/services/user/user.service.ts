import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public users: Array<IUser> = [
    {
     id:1,
     username:'admin',
     email: 'admin@gmail.com',
     password: 'admin'
    }
  ]

  constructor() { }
  getUser():Array<IUser>{
    return this.users;
}
addUser(user:IUser):void{
this.users.push(user);
}
}