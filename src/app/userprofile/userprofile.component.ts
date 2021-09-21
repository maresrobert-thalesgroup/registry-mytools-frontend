import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VirtualTimeScheduler } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AnimationStyleMetadata } from '@angular/animations';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  httpOptions:any;
  emailRequest:any;
  userProfile:any;

  email:any;
  firstName:any;
  lastName:any;
  role:any;
  gbu:any;
  team:any;
  hasOfficeIncomeTraining:any;


  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(){

    console.log(sessionStorage.getItem('token'));

    this.httpOptions = {
      headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization':sessionStorage.getItem('token')+ "",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    },   
    )
    };


    this.emailRequest = {"email": sessionStorage.getItem('email')}
    this.httpClient.post("http://localhost:8080/api/v1/profile",this.emailRequest,this.httpOptions).subscribe(data=>{
      this.userProfile=data;
      console.log(this.userProfile);   
      this.email=this.userProfile.email;
      this.firstName=this.userProfile.firstName;
      this.lastName=this.userProfile.lastName;
      this.role=this.userProfile.role;
      this.gbu=this.userProfile.team.gbu.name;
      this.team=this.userProfile.team.name;
      this.hasOfficeIncomeTraining=this.userProfile.hasOfficeIncomeTraining;

    })
  }
  

}
