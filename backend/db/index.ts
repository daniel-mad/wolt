import { v4 as uuid } from 'uuid';
import { User } from '../src/models/user.type';

class DB {
  users: User[];
  constructor() {
    this.users = [];
  }

  Add(user: User) {
    const { password_confirm, ...obj } = user;
    const found = this.users.find(u => u.id === user.id);
    if (!found) {
      const dbUser = {
        id: uuid(),
        ...obj,
      };
      this.users.push(dbUser);
      return dbUser;
    }
  }

  findByEmail(email: string) {
    const user = this.users.find(user => user.email === email);
    return user;
  }

  findById(id: string): User | undefined {
    const user = this.users.find(user => user.id === id);
    return user;
  }

  getUsers() {
    return this.users;
  }
}

export const db = new DB();
