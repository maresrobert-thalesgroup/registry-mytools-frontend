import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptService {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (sessionStorage.getItem("email") && sessionStorage.getItem("token")) {
      req = req.clone({
        headers: req.headers.append("Authorization", "" + sessionStorage.getItem('token'))
      })
    }
    return next.handle(req);
  }
}
