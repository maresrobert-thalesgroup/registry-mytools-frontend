import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationserviceService {

  httpOptions: any;

  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService, private router: Router) {
  }

  validate() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token') + "",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      },
      )
    };

    let validationRequest = {
      "email": sessionStorage.getItem("email"),
      "role": sessionStorage.getItem("role")
    }

    this.httpClient.post("http://localhost:8080/validate", validationRequest, this.httpOptions).subscribe(data => {

      if (!data) {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
      }
    })
  }
}
