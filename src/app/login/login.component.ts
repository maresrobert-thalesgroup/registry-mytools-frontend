import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = "";
  password = "";
  invalidLogin = false;

  @Input() error : string | null;

  constructor(private router: Router, private loginService : AuthenticationService) {
    this.error = "";
  }

  ngOnInit(): void {
  }

  checkLogin(){
    this.loginService.authenticate(this.email, this.password).subscribe(
      data => {
        this.router.navigate(["/mybookings"])
        this.invalidLogin = false;
      },
      error => {
        this.invalidLogin = true;
        this.error = error.message;
      }
    );
  }

}
