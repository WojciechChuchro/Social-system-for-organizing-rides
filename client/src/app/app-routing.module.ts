import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {LoginComponent} from './login/login.component'
import {AboutusComponent} from './aboutus/aboutus.component'
import {RegistrationComponent} from './registration/registration.component'
import {ProfileComponent} from './profile/profile.component'
import {SearchComponent} from './search/search.component'
import {CreateRideComponent} from './create-ride/create-ride.component'
import {CreateRideDriverComponent} from './create-ride-driver/create-ride-driver.component'
import {CreateRidePassengerComponent} from './create-ride-passenger/create-ride-passenger.component'
import {RideDetailComponent} from './ride-detail/ride-detail.component'

const routes: Routes = [
  {path: 'ride-detail/:id', component: RideDetailComponent},
  {
    path: 'about-us',
    component: AboutusComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'create-ride',
    component: CreateRideComponent,
  },
  {
    path: 'create-ride-driver',
    component: CreateRideDriverComponent,
  },
  {
    path: 'create-ride-passenger',
    component: CreateRidePassengerComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
