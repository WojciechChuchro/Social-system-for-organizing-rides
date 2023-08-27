import {Injectable} from '@angular/core'
import {MatSnackBar} from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private snackBar: MatSnackBar) {
  }

  showAlert(message: string, action: string, duration: number): void {
    this.snackBar.open(message, action, {
      duration: duration,
    })
  }
}
