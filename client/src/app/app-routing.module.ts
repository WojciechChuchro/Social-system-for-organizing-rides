import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { CreateRideComponent } from './create-ride/create-ride.component';
import { CreateRideDriverComponent } from './create-ride-driver/create-ride-driver.component';
import { CreateRidePassengerComponent } from './create-ride-passenger/create-ride-passenger.component';

const routes: Routes = [
  {
    path: 'aboutUs',
    component: AboutusComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'createRide',
    component: CreateRideComponent,
  },
  {
    path: 'createRideDriver',
    component: CreateRideDriverComponent,
  },
  {
    path: 'createRidePassenger',
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
