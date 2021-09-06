import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  httpOptions:any;
  bookingList:any = [];

  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token') + "",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      },
      )
    };
    this.httpClient.get("http://localhost:8080/api/v1/booking",this.httpOptions).subscribe(data => {
      this.bookingList = data;
      console.log(this.bookingList);
    })
  }

  getColorStatus(status:number) :String{
    switch(status){
      case 0:
        return "red";
      case 1:
        return "lime";
      case 2:
        return "orange";
    }
    return "white";
  }

}
