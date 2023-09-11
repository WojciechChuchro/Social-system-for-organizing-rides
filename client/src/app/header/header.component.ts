import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean> = of(true);
  private breakpointObserver = inject(BreakpointObserver);
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private cdRef: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router,
    private utilityService: UtilityService,
  ) {}

  ngOnInit(): void {
    this.authService.validateToken().subscribe({
      next: (isValid) => {
        if (isValid) {
          this.authService.setLoginStatus(true);
        } else {
          this.authService.setLoginStatus(false);
        }
      },
      error: (error) => {
        const errorMessage = error.error.message || 'An unknown error occurred';
        this.utilityService.showAlert(errorMessage, 'Close', 3000);
        this.authService.setLoginStatus(false);
      },
    });

    this.isLoggedIn$ = this.authService.loginStatus$;

    this.cdRef.detectChanges();
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.setLoginStatus(false);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log(error);
        const errorMessage = error.error.message || 'An unknown error occurred';
        this.utilityService.showAlert(errorMessage, 'Close', 3000);
      },
    });
  }
}
