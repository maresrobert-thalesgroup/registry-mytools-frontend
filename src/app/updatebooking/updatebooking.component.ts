import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BookingRequest } from '../model/booking_request.model';
import { NavbartemplatesComponent } from '../navbartemplates/navbartemplates.component';

@Component({
  selector: 'app-updatebooking',
  templateUrl: './updatebooking.component.html',
  styleUrls: ['./updatebooking.component.css']
})
export class UpdatebookingComponent implements OnInit {
  

  startDate: Date = this.getMonday(new Date());
  endDate: Date = this.getMonday(new Date());
  minDate: Date = this.getMonday(new Date());

  dropdownList = [{ item_id: 1, item_text: '6' },
  { item_id: 2, item_text: '7' },
  { item_id: 3, item_text: '8' },];
  selectedItems: any = [];
  dropdownSettings: IDropdownSettings = {};

  selelectedKitRequired:any;
  httpOptions:any;
  id:number;
  booking:any;
  requestByList:any;
  requestForList:any=[];
  selectedRequestBy:any;
  selectedRequestFor:any;
  email:any;
  requestBy:any;
  status:any;
  bookingRequest:BookingRequest=new BookingRequest();
  floorAccess: number[] = [];

  constructor(private router:Router,private httpClient:HttpClient,private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token') + "",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      },
      )
    };

    this.httpClient.get("http://localhost:8080/api/v1/profile/users",this.httpOptions).subscribe(data => {
      this.requestByList = data;
      console.log(this.requestByList);
    })

    this.id=this.route.snapshot.params['id'];
    this.httpClient.get("http://localhost:8080/api/v1/booking/"+this.id,this.httpOptions).subscribe(data => {
      this.booking = data;
      console.log(this.booking);
     
      for (let i = 0; i < this.requestByList.length; i++) {
        if(this.requestByList[i].email == this.booking.request_by.email)
        this.selectedRequestBy = this.requestByList[i];
        
    }
    
    this.updateRequestFor(this.selectedRequestBy);

    this.startDate=this.booking.startDate;
    this.endDate=this.booking.endDate;
    console.log(this.startDate,this.endDate);

    this.selectedItems=this.booking.accessFloors;
    console.log(this.selectedItems);

    this.selelectedKitRequired=this.booking.kitNeeded;
    console.log(this.selelectedKitRequired);
    
    this.status=this.booking.status;
    console.log(this.booking.status);
  })



  }

  getRequestFor(teamId:any){
    this.httpClient.get("http://localhost:8080/api/v1/profile/"+teamId,this.httpOptions).subscribe(data => {
      this.requestForList = data;
      console.log(this.requestForList);
      for (let i = 0; i < this.requestForList.length; i++) {
        if(this.requestForList[i].email == this.booking.request_for.email)
        console.log(this.requestForList[i].email,this.booking.request_for.email);
        this.selectedRequestFor = this.requestForList[i];
      }
    })
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  getMonday(d: Date) {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff) + 6.048e+8);
  }

  updateRequestFor(requestBy:any){
    console.log(requestBy.role);
    if(requestBy.role=="ROLE_USER"){
        this.requestForList=[];
        this.requestForList[0]=requestBy;

        for (let i = 0; i < this.requestForList.length; i++) {
          if(this.requestForList[i].email == this.booking.request_for.email)
          console.log(this.requestForList[i].email,this.booking.request_for.email);
          this.selectedRequestFor = this.requestForList[i];
        }
        
    }
    if(requestBy.role=="ROLE_MANAGER")
    this.getRequestFor(requestBy.team.id);
    }

    onSubmit(){
      this.bookingRequest.request_by_id=this.selectedRequestBy.id;
      this.bookingRequest.request_for_id=this.selectedRequestFor.id;

      this.bookingRequest.startDate=this.startDate;
      this.bookingRequest.endDate=this.endDate;

      console.log(this.selectedItems);
      for (let i = 0; i < this.selectedItems.length; i++) {
        this.floorAccess[i] = parseInt(this.selectedItems[i].item_text); //use i instead of 0
      }

      this.bookingRequest.accessFloors=this.floorAccess;
      this.bookingRequest.kitNeeded=this.selelectedKitRequired;
      this.bookingRequest.status=this.status;

      console.log(this.bookingRequest);
    
      this.httpClient.put("http://localhost:8080/api/v1/booking/" + this.booking.id,this.bookingRequest,this.httpOptions).subscribe(data => {
        console.log(data);
        this.router.navigate(['/administration']);
      })
    }
}
