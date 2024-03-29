import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BookingRequest } from '../model/booking_request.model';
import { ValidationserviceService } from '../service/validationservice.service';

@Component({
  selector: 'app-addbooking',
  templateUrl: './addbooking.component.html',
  styleUrls: ['./addbooking.component.css']
})
export class AddbookingComponent implements OnInit {

  dropdownSettings: IDropdownSettings = {};
  dropdownList = [{ item_id: 1, item_text: '6' },
  { item_id: 2, item_text: '7' },
  { item_id: 3, item_text: '8' },];
  selectedItems: any = [];

  httpOptions: any;
  requestByList: any;
  selectedRequestBy: any;
  requestForList: any = [];
  selectedRequestFor: any;

  startDate: Date = this.getMonday(new Date());
  endDate: Date = this.getMonday(new Date());
  minDate: Date = this.getMonday(new Date());

  selelectedKitRequired: any;
  status: any;
  floorAccess: number[] = [];

  bookingRequest: BookingRequest = new BookingRequest();

  form: FormGroup;


  constructor(private httpClient: HttpClient, private router: Router, private validationService: ValidationserviceService) {
    validationService.validate();

    this.form = new FormGroup({

      'requestBy': new FormControl('', Validators.required),
      'requestFor': new FormControl('', Validators.required),
      'accesFloor': new FormControl('', Validators.required),
      'kitNeeded': new FormControl('', Validators.required),
      'status': new FormControl('', Validators.required)
    });

  }

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

    this.httpClient.get("http://localhost:8080/api/v1/profile/users", this.httpOptions).subscribe(data => {
      this.requestByList = data;

    })



  }

  onItemSelect(item: any) {

  }
  onSelectAll(items: any) {

  }

  updateRequestFor(requestBy: any) {

    if (requestBy.role == "ROLE_USER") {
      this.requestForList = [];
      this.requestForList[0] = requestBy;

    }
    if (requestBy.role == "ROLE_MANAGER") {
      this.getRequestFor(requestBy.team.id);
    }

  }

  getRequestFor(teamId: any) {
    this.httpClient.get("http://localhost:8080/api/v1/profile/" + teamId, this.httpOptions).subscribe(data => {
      this.requestForList = data;

    })
  }

  getMonday(d: Date) {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff) + 6.048e+8);
  }

  onSubmit() {

    this.bookingRequest.request_by_id = this.selectedRequestBy.id;
    this.bookingRequest.request_for_id = this.selectedRequestFor.id;

    this.bookingRequest.startDate = this.startDate;
    this.bookingRequest.endDate = this.endDate;

    for (let i = 0; i < this.selectedItems.length; i++) {
      this.floorAccess[i] = parseInt(this.selectedItems[i].item_text); //use i instead of 0
    }

    this.bookingRequest.accessFloors = this.floorAccess;

    this.bookingRequest.kitNeeded = this.selelectedKitRequired;
    this.bookingRequest.status = this.status;



    this.httpClient.post("http://localhost:8080/api/v1/booking", this.bookingRequest, this.httpOptions).subscribe(data => {

    })

    this.router.navigate(['/administration']);

  }

  get f() { return this.form.controls }

}
