import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core'
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout'
import {Observable, of} from 'rxjs'
import {map, shareReplay} from 'rxjs/operators'
import {CookieService} from 'ngx-cookie-service'
import {HttpClient} from '@angular/common/http'
import {Router} from '@angular/router'
import {AuthService} from '../../services/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean> = of(true)
  private breakpointObserver = inject(BreakpointObserver)
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    )

  constructor(private http: HttpClient,
    private cookieService: CookieService,
    private cdRef: ChangeDetectorRef,
    private authService: AuthService,  // add this
    private router: Router  // add this
  ) {
  }

  ngOnInit(): void {
    // Existing initialization


    // POST request to validate the token
    this.authService.validateToken().subscribe({
      next: (isValid) => {
        if (isValid) {
          this.authService.setLoginStatus(true)
        } else {
          this.authService.setLoginStatus(false)
        }
      },
      error: (error) => {
        console.error('Error during token validation:', error)
        this.authService.setLoginStatus(false)
      }
    })

    this.isLoggedIn$ = this.authService.loginStatus$

    this.cdRef.detectChanges()
  }


  logout(): void {
    this.authService.logout().subscribe(() => {
      this.authService.setLoginStatus(false) // Set isLoggedIn to false after logout
      this.router.navigate(['/login']) // redirect user to login page or some other page after logout
    }, error => {
      console.error('Error during logout:', error)
    })
  }


}
