import { Injectable } from '@nestjs/common';
import { User } from './entity/Users';

@Injectable()
export class UsersService {
  users: User[] = [];

  findUserNotPass(body: User) {
    throw new Error('Method not implemented.');
  }
  findUserPass() {
    throw new Error('Method not implemented.');
  }
  createSignin(): void {
    throw new Error('Method not implemented.');
  }
  createUser({name, email, password, avatar}: User){
    const user = new User(name, email, password, avatar)

    this.users.push(user);

    return this.users
  }
}
