import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

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

  constructor(private httpClient: HttpClient) {

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token') + "",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      })
    };

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
      singleSelection: false,
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

  done() {
    let floors: String[] = [];
    for (let i of this.selectedItems) {
      floors.push(i.item_text);
    }
    let bookingPackage: any = {
      "request_by_id": this.userData.id,
      "request_for_id": this.role === "ROLE_USER" ? this.userData.id : this.selectedEmployees[0].item_id,
      "startDate": this.startDate.getTime() + (1000 * 60 * 60 * 24),
      "endDate": this.endDate.getTime() + (1000 * 60 * 60 * 24),
      "accessFloors": floors.join(),
      "kitNeeded": this.kitNeeded,
      "status": this.role === "ROLE_USER" ? 2 : 1
    }
    console.log(bookingPackage);
    this.httpClient.post("http://localhost:8080/api/v1/booking", bookingPackage, this.httpOptions).subscribe(data => {
      console.log(data);
    })
  }
}









