import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";

export class User {
  constructor(public status: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  emailRequest: any;
  httpOptions: any;
  userProfile: any;
  constructor(private httpClient: HttpClient) { }

  authenticate(email: string, password: string) {
    return this.httpClient.post<any>("http://localhost:8080/authenticate", { email, password })
      .pipe(
        map(userData => {
          sessionStorage.setItem("email", email);
          let tokenString = "Bearer " + userData.jwtToken;
          sessionStorage.setItem("token", tokenString);
          sessionStorage.setItem("role", userData.role[0].authority);


          this.httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': sessionStorage.getItem('token') + "",
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            },
            )
          };

          this.emailRequest = { "email": sessionStorage.getItem('email') }
          this.httpClient.post("http://localhost:8080/api/v1/profile", this.emailRequest, this.httpOptions).subscribe(data => {
            this.userProfile = data;
            sessionStorage.setItem("id", this.userProfile.id);
          })

          return userData;
        }));
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("email");

    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("id");
  }
}