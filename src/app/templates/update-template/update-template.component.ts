import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ApiResponse } from 'src/app/model/api.response';
import { Template } from 'src/app/model/template.model';
import { TemplateRequest } from 'src/app/model/template_request.model';
import { TemplateService } from 'src/app/service/template.service';

@Component({
  selector: 'app-update-template',
  templateUrl: './update-template.component.html',
  styleUrls: ['./update-template.component.css']
})
export class UpdateTemplateComponent implements OnInit {
  id: number;
  template: any;
  apiResponse: ApiResponse;
  gbu: any;
  team: any;
  teamId: any;
  role: String = sessionStorage.getItem("role") + "";
  manager: any;
  templateRequest: TemplateRequest = new TemplateRequest();
  floorAcces: number[] = [];
  dropdownList = [{ item_id: 1, item_text: '6' },
  { item_id: 2, item_text: '7' },
  { item_id: 3, item_text: '8' },];
  dropdownSettings: IDropdownSettings = {};
  selectedItems: any;
  selelectedKitRequired = "";
  hasOfficeIncomeTraining: Boolean = false;
  dropdownSettingsEmployees: IDropdownSettings = {};
  employeeDropdownList: any = [];
  selectedEmployees: any;
  httpOptions: any;
  form: FormGroup;



  constructor(private router: Router, private templateService: TemplateService, private route: ActivatedRoute, private httpClient: HttpClient) {

    this.form = new FormGroup({
      'kitNeeded': new FormControl('', Validators.required),
      'accesFloor': new FormControl('', Validators.required),
      'requestFor': new FormControl('', Validators.required)
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

    this.dropdownSettingsEmployees = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };

    this.getTemplate();

  }


  getTemplate() {
    console.log(sessionStorage.getItem('token'));

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token') + "",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      },
      )
    };

    this.id = this.route.snapshot.params['id'];

    this.templateService.getTemplateById(this.id).subscribe(
      data => {
        console.log(data)
        this.template = data;
        this.gbu = this.template.requestBy.team.gbu.name;
        this.team = this.template.requestBy.team.name;
        this.teamId = this.template.requestBy.team.id;

        this.selectedItems = [];

        for (let i = 0; i < this.template.floorAccess.length; i++) {
          for (let j = 0; j < this.dropdownList.length; j++) {
            if (this.template.floorAccess[i].toString() === this.dropdownList[j].item_text)
              this.selectedItems.push(this.dropdownList[j]);
          }
        }
        console.log(this.selectedItems);

        //this.selectedItems = this.template.floorAccess;


        this.hasOfficeIncomeTraining = this.template.requestBy.hasOfficeIncomeTraining;
        this.selelectedKitRequired = this.template.kitRequired;

        console.log(this.teamId);
        console.log(this.role);

        if (this.role === 'ROLE_USER') {
          this.manager = "No manager to display";
          this.form.controls['requestFor'].clearValidators();
          this.form.controls['requestFor'].updateValueAndValidity();
        } else if (this.role === 'ROLE_MANAGER') {
          this.httpClient.get<any>("http://localhost:8080/api/v1/profile/" + this.template.requestBy.team.id, this.httpOptions).subscribe(data => {
            let tempData: any = data;
            let tempList: any = [];
            for (var e of tempData) {
              tempList.push({ item_id: e.id, item_text: e.email });
            }
            this.employeeDropdownList = tempList;
            console.log("employeeDropdownList",this.employeeDropdownList);

            this.selectedEmployees = [];

            for (let i = 0; i < this.employeeDropdownList.length; i++) {
              if(this.template.requestFor.email === this.employeeDropdownList[i].item_text)
                this.selectedEmployees.push(this.employeeDropdownList[i]);
            }
            console.log(this.selectedEmployees);
          })

        }

      },
      error => console.log(error));

  }

  onSubmit() {

    this.templateRequest.requestById = this.template.requestBy.id;
    this.templateRequest.requestForId = this.role === "ROLE_USER" ? this.template.requestFor.id : this.selectedEmployees[0].item_id;

    console.log(this.selectedItems);

    for (let i = 0; i < this.selectedItems.length; i++) {
      this.floorAcces[i] = parseInt(this.selectedItems[i].item_text); //use i instead of 0
    }

    this.templateRequest.floorAccess = this.floorAcces;
    this.templateRequest.kitRequired = this.selelectedKitRequired;

    console.log(this.templateRequest);
    console.log(this.template.id);
    this.templateService.updateTemplate(this.template.id, this.templateRequest).subscribe(
      data => console.log(data), error => console.error());
    this.router.navigate(['/navbartemplates/templateslist']);
    //console.log(this.template);
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);

  }

  get f() { return this.form.controls }


}
