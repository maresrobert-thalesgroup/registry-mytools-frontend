import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TemplateService } from '../service/template.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  role: String = sessionStorage.getItem("role") + "";
  name: String = sessionStorage.getItem("email") + "";
  startDate: Date = this.getMonday(new Date());
  endDate: Date = this.getMonday(new Date());
  dropdownList = [{ item_id: 1, item_text: '6' },
  { item_id: 2, item_text: '7' },
  { item_id: 3, item_text: '8' },];
  selectedItems: any = [];
  dropdownSettings: IDropdownSettings = {};
  minDate: Date = this.getMonday(new Date());
  gbu: String = "";
  team: String = "";
  manager: String = "";
  hasOfficeIncomeTraining: Boolean = false;
  dropdownSettingsEmployees: IDropdownSettings = {};
  employeeDropdownList: any = [];
  selectedEmployees: any = [];
  kitNeeded: String = "";
  httpOptions: any;
  userData: any;
  templateId:any;
  template:any;
  form:FormGroup;
  userId:number;
  templates:any;
  selectedTemplate:any;

  constructor(private templateService:TemplateService, private httpClient: HttpClient,private route: ActivatedRoute, private snackBar:MatSnackBar) {

    this.form=new FormGroup({
      'kitNeeded': new FormControl('',Validators.required),
      'accesFloor': new FormControl('',Validators.required),   
      'requestFor': new FormControl('',Validators.required)
    });
    
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token') + "",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      })
    };

    this.userId= Number(sessionStorage.getItem("id"));

    console.log(this.userId);
    this.templateService.getTemplatesByUserId(this.userId).subscribe(data=>
      {console.log(data);
      this.templates=data;
      });
    

    let packageEmail = { "email": sessionStorage.getItem('email') }
    this.httpClient.post<any>("http://localhost:8080/api/v1/profile", packageEmail, this.httpOptions).subscribe(data => {
      this.userData = data;
      this.hasOfficeIncomeTraining = this.userData.hasOfficeIncomeTraining;
      this.team = this.userData.team.name;
      this.gbu = this.userData.team.gbu.name;
      if (this.role === 'ROLE_USER') {
        this.manager = this.userData.manager.email ? this.userData.manager.email : "No manager to display";
      } else if (this.role === 'ROLE_MANAGER') {
        this.httpClient.get<any>("http://localhost:8080/api/v1/profile/" + this.userData.team.id, this.httpOptions).subscribe(data => {
          let tempData: any = data;
          let tempList: any = [];
          for (var e of tempData) {
            tempList.push({ item_id: e.id, item_text: e.email });
          }
          this.employeeDropdownList = tempList;
          console.log(this.employeeDropdownList);
        })
      }
      
        if (this.role==='ROLE_USER') {
        this.form.controls['requestFor'].clearValidators();
        this.form.controls['requestFor'].updateValueAndValidity();
        }

    if(this.route.snapshot.paramMap.get('templateId')!=null){
    this.templateId=this.route.snapshot.paramMap.get('templateId');
    this.templateService.getTemplateById(this.templateId).subscribe(data=>{
      this.template=data;
      console.log(data);
      this.name=this.template.requestBy.email;
      this.gbu=this.template.requestBy.team.gbu.name;
      this.team=this.template.requestBy.team.name;

    this.selectedItems = [];

    for (let i = 0; i < this.template.floorAccess.length; i++){ 
      for (let j = 0; j < this.dropdownList.length; j++) {
        if(this.template.floorAccess[i].toString() === this.dropdownList[j].item_text)
          this.selectedItems.push(this.dropdownList[j]);
      }
    }
    console.log(this.selectedItems);

    if (this.role === 'ROLE_MANAGER'){
      
      this.selectedEmployees = [];
    
      for (let i = 0; i < this.employeeDropdownList.length; i++) {
        if(this.template.requestFor.email === this.employeeDropdownList[i].item_text)
          this.selectedEmployees.push(this.employeeDropdownList[i]);
      }
      console.log(this.selectedEmployees);
    }

      this.kitNeeded=this.template.kitRequired;
      this.hasOfficeIncomeTraining=this.template.requestBy.hasOfficeIncomeTraining;

    })
  }
})
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

    this.dropdownSettingsEmployees = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
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

  get f (){return this.form.controls}

  applyTemplate(){

    this.selectedItems = [];

    for (let i = 0; i < this.selectedTemplate.floorAccess.length; i++){ 
      for (let j = 0; j < this.dropdownList.length; j++) {
        if(this.selectedTemplate.floorAccess[i].toString() === this.dropdownList[j].item_text)
          this.selectedItems.push(this.dropdownList[j]);
      }
    }
    console.log(this.selectedItems);

    this.kitNeeded=this.selectedTemplate.kitRequired;

    if (this.role === 'ROLE_MANAGER'){
      
      this.selectedEmployees = [];
    
      for (let i = 0; i < this.employeeDropdownList.length; i++) {
        if(this.selectedTemplate.requestFor === this.employeeDropdownList[i].item_text)
          this.selectedEmployees.push(this.employeeDropdownList[i]);
      }
      console.log(this.selectedEmployees);
    }
    
  } 

  done() {
    let floors: number[] = [];
    for (let i of this.selectedItems) {
      floors.push(parseInt(i.item_text));
    }
    let bookingPackage: any = {
      "request_by_id": this.userData.id,
      "request_for_id": this.role === "ROLE_USER" ? this.userData.id : this.selectedEmployees[0].item_id,
      "startDate": this.startDate.getTime() + 1000*60*60*3,
      "endDate": this.endDate.getTime() + 1000*60*60*3,
      "accessFloors": floors,
      "kitNeeded": this.kitNeeded,
      "status": this.role === "ROLE_USER" ? 2 : 1
    }
    console.log(bookingPackage);
    this.httpClient.post("http://localhost:8080/api/v1/booking", bookingPackage, this.httpOptions).subscribe(data => {
      console.log(data);
    })
    this.snackBar.open("Booking sent succesfully! View in my bookings","ok",{duration:3000});
  }
}









