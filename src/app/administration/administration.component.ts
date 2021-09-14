import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  httpOptions:any;
  bookingList:any = [];

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

  deleteBooking(id:number){

    console.log(id);
    this.httpClient.delete("http://localhost:8080/api/v1/booking/delete/" + id,this.httpOptions).subscribe(data=>{
      console.log(data);
    })

    this.httpClient.get("http://localhost:8080/api/v1/booking",this.httpOptions).subscribe(data => {
      this.bookingList = data;
      console.log(this.bookingList);
    })
  }
  
  updateBooking(id:number){
    this.router.navigate(['updatebooking',id]);
  }

  createBooking(){
    this.router.navigate(['/addbooking']);
  }

}
