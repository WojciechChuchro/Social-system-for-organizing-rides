import { Injectable } from '@angular/core';
import { User } from '../../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User | null = null;

  constructor() {}

  getUser() {
    return this.user;
  }

  setUser(user: User) {
    this.user = user;
  }
  set id_user(id: number) {
    this.user!.id_user = id;
  }
}
