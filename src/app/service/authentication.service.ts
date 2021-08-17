import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from "rxjs/operators";

export class User {
  constructor(public status: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  authenticate(email:string, password:string){
    return this.httpClient.post<any>("http://localhost:8080/authenticate", {email, password})
    .pipe(
      map(userData => {
      sessionStorage.setItem("email",email);
      let tokenString = "Bearer "+ userData.jwtToken;
      sessionStorage.setItem("token",tokenString);
      sessionStorage.setItem("role", userData.role[0].authority);
      return userData;
    }));
  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem("email");
    console.log(!(user === null));
    return !(user === null);
  }

  logout(){
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
  }
}