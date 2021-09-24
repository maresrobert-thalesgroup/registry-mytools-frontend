import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ValidationserviceService } from '../service/validationservice.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  httpOptions:any;
  bookingList:any = [];
  isLoaded:boolean=false;

  constructor(private httpClient:HttpClient, private router:Router, private validationService:ValidationserviceService) {
    validationService.validate();
  }

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

    this.getAllBookings();
  }

  getAllBookings(){
    this.httpClient.get("http://localhost:8080/api/v1/booking",this.httpOptions).subscribe(data => {
      this.bookingList = data;

      this.isLoaded=true;
    })
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

  deleteBooking(id:number){


    this.httpClient.delete("http://localhost:8080/api/v1/booking/delete/" + id,this.httpOptions).subscribe(data=>{

      //this.bookingList = this.bookingList.filter((b:any)=>b.id !== id);
      this.getAllBookings();
    })
  }
  
  updateBooking(id:number){
    this.router.navigate(['updatebooking',id]);
  }

  createBooking(){
    this.router.navigate(['/addbooking']);
  }

}
