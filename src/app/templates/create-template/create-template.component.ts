import { Template } from 'src/app/model/template.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateService } from 'src/app/service/template.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppUser } from 'src/app/model/app_user.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TemplateRequest } from 'src/app/model/template_request.model';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent implements OnInit {

  template: TemplateRequest;
  submitted = false;
  userProfile: any;
  email: any;
  httpOptions: any;
  appUser: AppUser;
  selectedItems: any;
  floorAcces: number[] = [];
  selelectedKitRequired = "";
  hasOfficeIncomeTraining: Boolean = true;
  dropdownList = [{ item_id: 1, item_text: '6' },
  { item_id: 2, item_text: '7' },
  { item_id: 3, item_text: '8' },];
  dropdownSettings: IDropdownSettings = {};

  constructor(private templateService: TemplateService, private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getUserProfile();
    this.template=new TemplateRequest();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
  }

  onSubmit() {

    this.template.requestById = this.userProfile.id;
    this.template.requestForId = 10;


    for (let i = 0; i < this.selectedItems.length; i++) {
      this.floorAcces[i] = parseInt(this.selectedItems[i].item_text); //use i instead of 0

    }
    console.log(this.floorAcces);
    this.template.floorAccess = this.floorAcces;
    this.template.kitRequired = this.selelectedKitRequired;
    this.submitted = true;
    console.log(this.template);

    this.templateService.createTemplate(this.template).subscribe(
      data => console.log(data), error => console.log(error));
    this.template = new TemplateRequest();
    this.router.navigate(['/navbartemplates/templateslist']);

  }

  getUserProfile() {

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


    this.email = { "email": sessionStorage.getItem('email') }
    this.httpClient.post("http://localhost:8080/api/v1/profile", this.email, this.httpOptions).subscribe(data => {
      this.userProfile = data;
      console.log(this.userProfile);
    })
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);

  }


}