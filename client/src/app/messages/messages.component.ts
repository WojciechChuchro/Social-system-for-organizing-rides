import {Component, OnInit} from '@angular/core'
import {SocketService} from '../../services/socket.service'
import {Reviews, UserWithReviews} from '../../types/user'
import {AuthService} from '../../services/auth.service'

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  public messages: Array<{ sender: string, message: string }> = []
  public message: string | null = null
  public targetEmail: string = 'target-email@example.com' // Assume you know the target email
  email: string | null = null
  name: string | null = null
  surname: string | null = null
  phoneNumber: string | null = null
  profilePicture: string | null = null
  reviews: Reviews[] | null = null
  averageRating: number | null = null

  constructor(private socketService: SocketService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getDataWithJwtCookie().subscribe(
      (response: UserWithReviews) => {
        this.email = response.email
        this.name = response.name
        this.surname = response.surname
        this.phoneNumber = response.phoneNumber
        this.profilePicture = response.profilePicture

        // Register the user with their email once data is available
        this.socketService.emitEvent('register', this.email)
      },
      (error) => {
        console.error('Error:', error)
      }
    )

    this.socketService.listenForEvent('newMessage', (data: { sender: string, message: string }) => {
      this.messages.push(data)
    })
  }

  sendMessage(): void {
    if (!this.email || !this.message) {
      return
    }
    const messageData = {
      message: this.message,
      sender: this.email,
      targetEmail: this.targetEmail,
    }
    this.socketService.emitEvent('sendMessage', messageData)
    this.message = ''
  }
}
