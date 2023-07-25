import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { LoginStatusService } from '../shared/login-status.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private breakpointObserver = inject(BreakpointObserver);
  isLoggedIn$: Observable<boolean> = of(true);
  constructor(
    private cookieService: CookieService,
    private cdRef: ChangeDetectorRef,
    private loginStatusService: LoginStatusService
  ) {}

  ngOnInit() {
    this.isLoggedIn$ = this.loginStatusService.loginStatus$;
    console.log(this.isLoggedIn$);
    const jwt = this.cookieService.get('JsonWebToken');
    if (jwt) {
      this.loginStatusService.setLoginStatus(true);
    }
    this.cdRef.detectChanges();
  }

  logout() {
    this.cookieService.delete('JsonWebToken');
    this.loginStatusService.setLoginStatus(false); // Set isLoggedIn to false after logout
    this.cdRef.detectChanges();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}
