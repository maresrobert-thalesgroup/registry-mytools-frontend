import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VirtualTimeScheduler } from 'rxjs';

export class UserProfile{
  constructor(
    public id:number,
    public email: string,
    public firstname: string,
    public lastname: string,
    public hasOfficeIncomeTraining:boolean,
    public role:string,
    public team:string
  ){}
  
}

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  userProfile:any;
  email:any;
  httpOptions:any;

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


    this.email = {"email": sessionStorage.getItem('email')}
    this.httpClient.post("http://localhost:8080/api/v1/profile",this.email,this.httpOptions).subscribe(data=>{
      this.userProfile=data;
      console.log(this.userProfile);   
    })
  }
  

}
