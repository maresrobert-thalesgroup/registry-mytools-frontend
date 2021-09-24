import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ValidationserviceService } from '../service/validationservice.service';

@Component({
  selector: 'app-booking-request',
  templateUrl: './booking-request.component.html',
  styleUrls: ['./booking-request.component.css']
})
export class BookingRequestComponent implements OnInit {
  
  bookingList:any = [];
  httpOptions:any;
  constructor(private httpClient:HttpClient, private validationService:ValidationserviceService) {
    validationService.validate();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token') + "",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      })
    };
  }

  ngOnInit(): void {
    this.httpClient.post("http://localhost:8080/api/v1/booking/bookingreq",{"email":sessionStorage.getItem("email")},this.httpOptions).subscribe(data =>{
      this.bookingList = data;
      console.log(this.bookingList);
    })
  }

  updateBooking(id:number, status:number){
    this.httpClient.put("http://localhost:8080/api/v1/booking/update/"+id,{"status":status},this.httpOptions).subscribe(data => {
      console.log(data);
      this.bookingList = this.bookingList.filter((b:any) => b.id !== id);
    })
  }

}
