import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterformComponent } from './registerform/registerform.component';
import { AuthGuardService } from './service/auth-guard.service';
import { TemplatesComponent } from './templates/templates.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

const routes: Routes = [
  {path:"",component: HomeComponent, canActivate:[AuthGuardService]},
  {path:"login", component: LoginComponent},
  {path:"logout", component: LogoutComponent, canActivate:[AuthGuardService]},
  {path:"signup", component: RegisterformComponent},
  {path:"userprofile", component: UserprofileComponent, canActivate:[AuthGuardService]},
  {path:"bookadesk", component: BookingComponent, canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
