import { Component } from '@angular/core'
import { User } from 'src/types/user'
// import { UserService } from './services/user'; // Update the path accordingly
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'Social System For Organizing Rides'

	constructor() {}
}
