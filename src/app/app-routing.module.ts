import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingRequestComponent } from './booking-request/booking-request.component';
import { BookingComponent } from './booking/booking.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NavbartemplatesComponent } from './navbartemplates/navbartemplates.component';
import { RegisterformComponent } from './registerform/registerform.component';
import { AuthGuardService } from './service/auth-guard.service';
import { CreateTemplateComponent } from './templates/create-template/create-template.component';
import { TemplatesListComponent } from './templates/templates-list/templates-list.component';
import { TemplatesComponent } from './templates/templates.component';
import { UpdateTemplateComponent } from './templates/update-template/update-template.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

const routes: Routes = [
  {path:"",component: HomeComponent, canActivate:[AuthGuardService]},
  {path:"login", component: LoginComponent},
  {path:"logout", component: LogoutComponent, canActivate:[AuthGuardService]},
  {path:"signup", component: RegisterformComponent},
  {path:"userprofile", component: UserprofileComponent, canActivate:[AuthGuardService]},
  {path:"bookadesk", component: BookingComponent, canActivate:[AuthGuardService]},
  {path:"bookreq", component: BookingRequestComponent, canActivate:[AuthGuardService]},
  {path:"navbartemplates",component:NavbartemplatesComponent,
  children: [
    {path:"addtemplate",component:CreateTemplateComponent,canActivate:[AuthGuardService]},
    {path:"templateslist",component:TemplatesListComponent, canActivate:[AuthGuardService]},
    {path:"updatetemplate/:id",component:UpdateTemplateComponent, canActivate:[AuthGuardService]},
    {path: '', redirectTo: 'addtemplate', pathMatch: 'full'}, 
  ], 
  canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
