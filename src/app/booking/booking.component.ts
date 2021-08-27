
import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

 

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  role:String = sessionStorage.getItem("role")+"";
  name: String = sessionStorage.getItem("email") + "";
  requestFor:String = "";
  startDate: Date = this.getMonday(new Date());
  endDate: Date = this.getMonday(new Date());
  dropdownList = [{ item_id: 1, item_text: '6' },
  { item_id: 2, item_text: '7' },
  { item_id: 3, item_text: '8' },];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  minDate: Date = this.getMonday(new Date());
  gbu:String = "";
  team:String = "";
  manager:String = "";
  hasOfficeIncomeTraining:Boolean = true;
  dropdownSettingsEmployees: IDropdownSettings = {};
  employeeDropdownList = [];
  selectedEmployees = [];

 

  constructor() { }

 

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

 

  getMonday(d:Date) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff) + 6.048e+8);
  }

 


  done() {
    console.log(this.name);
    console.log(this.startDate);
    console.log(this.endDate);
    console.log(this.selectedItems);
    console.log(this.gbu);
    console.log(this.team);
    console.log(this.manager);
    console.log(this.hasOfficeIncomeTraining);
  }
}
 








