import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-manager',
  templateUrl: './team-manager.component.html',
  styleUrls: ['./team-manager.component.css']
})
export class TeamManagerComponent implements OnInit {
  httpOptions:any;
  bookingList:any = [];
  printedListUpcoming:any = [];

  constructor(private httpClient:HttpClient, private router:Router) { }

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
    let role:String = sessionStorage.getItem('role') === 'ROLE_MANAGER'?'getasman':'getasusr'
    this.httpClient.post("http://localhost:8080/api/v1/booking/"+role,{"email":sessionStorage.getItem('email')}, this.httpOptions).subscribe(data => {
      this.bookingList = data;
      this.printedListUpcoming = this.getTimeSplit(this.bookingList,true);
    })
  }

  getTimeSplit(list:any, future:boolean){
    return JSON.parse(JSON.stringify(list.filter((b:any)=>{
      let dateDummy:Date = new Date(b.endDate);
      let d:Date = new Date();
      if(future){
        if(dateDummy.getTime() > d.getTime() && b.request_for.email !== sessionStorage.getItem('email')) return b;
      } else {
        if(dateDummy.getTime() < d.getTime() && b.request_for.email !== sessionStorage.getItem('email')) return b;
      }
    })));
  }

  getColorStatus(status: number): String {
    switch (status) {
      case 0:
        return "#f88379";
      case 1:
        return "#B2FFFF";
      case 2:
        return "#ffb347";
    }
    return "white";
  }

  updateBooking(id:number){
    this.router.navigate(['updatebooking',id]);
  }

}
