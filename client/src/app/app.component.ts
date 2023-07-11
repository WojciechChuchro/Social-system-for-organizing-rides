import { Component } from '@angular/core';
import { UserService } from './services/user'; // Update the path accordingly


interface User {
  id_user: number | null
  name: string
  login: string
  password: string
  phone_number: string
  profile_picture: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Social System For Organizing Rides';
  user: User = {
    id_user: null,
    name: '',
    login: '',
    password: '',
    phone_number: '',
    profile_picture: '',
  };
  constructor(private userService: UserService) {
    this.user.id_user = this.userService.getUserId(); // Retrieve the user ID from the service
    console.log(this.user.id_user)
  }
}
