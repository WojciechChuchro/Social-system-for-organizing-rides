import {TestBed} from '@angular/core/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {AuthGuard} from './auth.guard'
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router'
import {of} from 'rxjs'

describe('AuthGuard', () => {
  let guard: AuthGuard
  let authService: jasmine.SpyObj<AuthService>
  let router: Router

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['validateToken'])
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        {provide: AuthService, useValue: authSpy}
      ],
    })
    guard = TestBed.inject(AuthGuard)
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>
    router = TestBed.inject(Router)
  })

  it('should be created', () => {
    expect(guard).toBeTruthy()
  })

  describe('canActivate', () => {
    it('should return true if the user is authenticated', () => {
      authService.validateToken.and.returnValue(of(true))
      expect(guard.canActivate()).toBeTrue()
    })

    it('should navigate to login if the user is not authenticated', () => {
      const navigateSpy = spyOn(router, 'navigate')
      authService.validateToken.and.returnValue(of(false))
      expect(guard.canActivate()).toBeFalse()
      expect(navigateSpy).toHaveBeenCalledWith(['/login'])
    })
  })
})
