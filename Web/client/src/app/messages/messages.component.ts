import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Reviews, UserWithReviews } from '../../types/user';
import { AuthService } from '../../services/auth.service';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  public messages: Array<{ sender: string; message: string }> = [];
  public message: string | null = null;
  public targetEmail: string = 'target-email@example.com'; // Assume you know the target email
  email: string | null = null;
  name: string | null = null;
  surname: string | null = null;
  phoneNumber: string | null = null;
  profilePicture: string | null = null;
  reviews: Reviews[] | null = null;
  averageRating: number | null = null;

  constructor(
    private socketService: SocketService,
    private authService: AuthService,
    private utilityService: UtilityService,
  ) {}

  ngOnInit(): void {
    this.authService.getUserWithJwtCookie().subscribe({
      next: (response: UserWithReviews) => {
        this.email = response.email;
        this.name = response.name;
        this.surname = response.surname;
        this.phoneNumber = response.phoneNumber;
        this.profilePicture = response.profilePicture;
        this.socketService.emitEvent('register', this.email);
      },
      error: (error) => {
        console.error('Error:', error);
        const errorMessage = error.error.message || 'An unknown error occurred';
        this.utilityService.showAlert(errorMessage, 'Close', 3000);
      },
    });

    this.socketService.listenForEvent(
      'newMessage',
      (data: { sender: string; message: string }) => {
        this.messages.push(data);
      },
    );
  }

  sendMessage(): void {
    if (!this.email || !this.message) {
      return;
    }
    const messageData = {
      message: this.message,
      sender: this.email,
      targetEmail: this.targetEmail,
    };
    this.socketService.emitEvent('sendMessage', messageData);
    this.message = '';
  }
}
