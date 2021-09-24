import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  httpOptions: any;
  bookingList: any = [];
  printedListUpcoming: any = [];
  printedListPast:any = [];
  selected:String = "All";
  selectedSort:String = "Oldest to Newest"

  constructor(private httpClient: HttpClient, private router:Router) {

    if(sessionStorage.getItem('role') === "ROLE_ADMIN")
    this.router.navigate(["/administration"]);
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
    let role:String = sessionStorage.getItem('role') === 'ROLE_MANAGER'?'getasman':'getasusr'
    this.httpClient.post("http://localhost:8080/api/v1/booking/"+role,{"email":sessionStorage.getItem('email')}, this.httpOptions).subscribe(data => {
      this.bookingList = data;
      this.printedListUpcoming = this.getTimeSplit(this.bookingList,true);
      this.printedListPast = this.getTimeSplit(this.bookingList, false);
    })
  }

  getTimeSplit(list:any, future:boolean){
    return JSON.parse(JSON.stringify(list.filter((b:any)=>{
      let dateDummy:Date = new Date(b.endDate);
      let d:Date = new Date();
      if(future){
        if(dateDummy.getTime() > d.getTime() && b.request_for.email === sessionStorage.getItem('email')) return b;
      } else {
        if(dateDummy.getTime() < d.getTime() && b.request_for.email === sessionStorage.getItem('email')) return b;
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

  onOptionsSelectedEvent(event: String) {
    switch (event) {
      case "Rejected":
        this.printedListUpcoming = this.getTimeSplit(this.bookingList,true).filter((b: any) => b.status === 0);
        this.printedListPast = this.getTimeSplit(this.bookingList,false).filter((b: any) => b.status === 0);
        break;
      case "Accepted":
        this.printedListUpcoming = this.getTimeSplit(this.bookingList,true).filter((b: any) => b.status === 1);
        this.printedListPast = this.getTimeSplit(this.bookingList,false).filter((b: any) => b.status === 1);
        break;
      case "Pending":
        this.printedListUpcoming = this.getTimeSplit(this.bookingList,true).filter((b: any) => b.status === 2);
        this.printedListPast = this.getTimeSplit(this.bookingList,false).filter((b: any) => b.status === 2);
        break;
      case "All":
        this.printedListUpcoming = JSON.parse(JSON.stringify(this.getTimeSplit(this.bookingList,true)));
        this.printedListPast = JSON.parse(JSON.stringify(this.getTimeSplit(this.bookingList,false)));
        break;
    }
  }

  compare(a:any,b:any){
    let dateSA:Date = new Date(a.startDate);
    let dateEA:Date = new Date(a.endDate);
    let dateSB:Date = new Date(b.startDate);
    let dateEB:Date = new Date(b.endDate);
    if(Math.abs(dateEA.getTime() - dateSA.getTime()) < Math.abs(dateEB.getTime() - dateSB.getTime())) return -1;
    if(Math.abs(dateEA.getTime() - dateSA.getTime()) > Math.abs(dateEB.getTime() - dateSB.getTime())) return 1;
    return 0;
  }

  compareReversed(a:any,b:any){
    let dateSA:Date = new Date(a.startDate);
    let dateEA:Date = new Date(a.endDate);
    let dateSB:Date = new Date(b.startDate);
    let dateEB:Date = new Date(b.endDate);
    if(Math.abs(dateEA.getTime() - dateSA.getTime()) < Math.abs(dateEB.getTime() - dateSB.getTime())) return 1;
    if(Math.abs(dateEA.getTime() - dateSA.getTime()) > Math.abs(dateEB.getTime() - dateSB.getTime())) return -1;
    return 0;
  }

  onSortOptionSelected(value: string) {
    switch (value) {
      case "Oldest to Newest":
        this.printedListUpcoming = this.getTimeSplit(this.bookingList,true);
        this.printedListPast = this.getTimeSplit(this.bookingList,false);
        break;
      case "Newest to Oldest":
        this.printedListUpcoming = this.getTimeSplit(this.bookingList,true).reverse();
        this.printedListPast = this.getTimeSplit(this.bookingList,false).reverse();
        break;
      case "Descending - Booked Time":
        this.printedListUpcoming = JSON.parse(JSON.stringify(this.getTimeSplit(this.bookingList,true))).sort(this.compareReversed);
        this.printedListPast = JSON.parse(JSON.stringify(this.getTimeSplit(this.bookingList,false))).sort(this.compareReversed);
        break;
      case "Ascending - Booked Time":
        this.printedListUpcoming = JSON.parse(JSON.stringify(this.getTimeSplit(this.bookingList,true))).sort(this.compare);
        this.printedListPast = JSON.parse(JSON.stringify(this.getTimeSplit(this.bookingList,false))).sort(this.compare);
        break;
    }
  }
}
