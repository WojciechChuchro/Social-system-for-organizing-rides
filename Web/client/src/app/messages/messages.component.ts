import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { MessageResponseOnly, Messages, MessagesResponse, Reviews, UserWithReviews } from '../../types/user';
import { AuthService } from '../../services/auth.service';
import { UtilityService } from '../../services/utility.service';
import { IdSource, RideService } from '../../services/ride.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  public messages?: Messages[];
  public message: string | null = null;
  public targetEmail: string = 'target-email@example.com';
  email: string | null = null;
  name: string | null = null;
  surname: string | null = null;
  phoneNumber: string | null = null;
  profilePicture: string | null = null;
  id: number | null = null;
  reviews: Reviews[] | null = null;
  currentIds?: IdSource;

  constructor(
    private socketService: SocketService,
    private authService: AuthService,
    private utilityService: UtilityService,
    private rideService: RideService
  ) {}

  ngOnInit(): void {
    this.rideService.currentIds.subscribe({
      next: (response) => {
        this.currentIds = response
      },
      error: (error) => {
        console.error('Error:', error);
        const errorMessage = error.error.message || 'An unknown error occurred';
        this.utilityService.showAlert(errorMessage, 'Close', 3000);
      },
    });

    this.rideService.getMessages().subscribe({
      next: (messages: MessagesResponse) => {
        this.messages =  messages.messages
        const successMessage = messages.message || 'Success'
        this.utilityService.showAlert(successMessage, 'Close', 3000)
      },
      error: (error) => {
        console.error('Error:', error);
        const errorMessage = error.error.message || 'An unknown error occurred';
        this.utilityService.showAlert(errorMessage, 'Close', 3000);
      },
    });


    this.authService.getUserWithJwtCookie().subscribe({
      next: (response: UserWithReviews) => {
        const {id, email, name, surname, phoneNumber, profilePicture} = response
        this.id = id
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.phoneNumber = phoneNumber;
        this.profilePicture = profilePicture;
      },
      error: (error) => {
        console.error('Error:', error);
        const errorMessage = error.error.message || 'An unknown error occurred';
        this.utilityService.showAlert(errorMessage, 'Close', 3000);
      },
    });

    this.socketService.listenForEvent(
      'newMessage', (data: Messages) => {
        this.messages?.push(data);
      },
    );
  }
  formatDateToYYYYMMDDHHMMSS(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  sendMessage(): void {
    if (!this.email || !this.message) {
      return;
    }
    const messageData = {
      passengerId: this.currentIds?.passengerId,
      driverId: this.currentIds?.driverId,
      text: this.message,
      sendTime: this.formatDateToYYYYMMDDHHMMSS(new Date()),
      wasRead: 0
    };
    this.socketService.emitEvent('sendMessage', messageData);
    this.message = '';
  }
}
