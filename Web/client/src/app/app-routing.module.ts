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
import { RideDetailComponent } from './ride-detail/ride-detail.component';
import { AuthGuard } from './guards/auth.guard';
import { MessagesComponent } from './messages/messages.component';
import { YourRidesComponent } from './your-rides/your-rides.component';

const routes: Routes = [
  {
    path: 'ride-detail/:id',
    component: RideDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-ride',
    component: CreateRideComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-ride-driver',
    component: CreateRideDriverComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-ride-passenger',
    component: CreateRidePassengerComponent,
    canActivate: [AuthGuard],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] },
  {
    path: 'your-rides',
    component: YourRidesComponent,
    canActivate: [AuthGuard],
  },
  { path: 'about-us', component: AboutusComponent },
  { path: 'search', component: SearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
