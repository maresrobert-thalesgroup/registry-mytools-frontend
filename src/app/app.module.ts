import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { RegisterformComponent } from './registerform/registerform.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { NavbarComponent } from './navbar/navbar.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { BookingComponent } from './booking/booking.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BookingRequestComponent } from './booking-request/booking-request.component';
import { CreateTemplateComponent } from './templates/create-template/create-template.component';
import { UpdateTemplateComponent } from './templates/update-template/update-template.component';
import { TemplatesListComponent } from './templates/templates-list/templates-list.component';
import { TemplateService } from './service/template.service';
import { DataTablesModule } from 'angular-datatables';
import { NavbartemplatesComponent } from './navbartemplates/navbartemplates.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LogoutComponent,
    RegisterformComponent,
    NavbarComponent,
    UserprofileComponent,
    BookingComponent,
    BookingRequestComponent,
    CreateTemplateComponent,
    UpdateTemplateComponent,
    TemplatesListComponent,
    NavbartemplatesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    DataTablesModule
  ],
  providers: [TemplateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
