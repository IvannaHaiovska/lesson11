import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public users: Array<IUser> = [
    {
      id: 1,
      name: 'Admin',
      surname: 'Adminovuch',
      login: 'Admin',
      password: 'admin',
      email: 'admin@gmail.com',
      sex: 'male'
    },
    {
      id: 2,
      name: 'Pavlo',
      surname: 'Pavliv',
      login: 'Pavlo',
      password: 'Pavlo1',
      email: 'pavlo@gmail.com',
      sex: 'male'
    },
    {
      id: 3,
      name: 'Ira',
      surname: 'Abramov',
      login: 'Irochka',
      password: 'Ira123',
      email: 'abramov@gmail.com',
      sex: 'female'
    }
  ]

  constructor() { }
  getUser(): Array<IUser> {
    return this.users;
  }
  addUser(user: IUser): void {
    this.users.push(user);
  }
}