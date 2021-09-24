import { Template } from 'src/app/model/template.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateService } from 'src/app/service/template.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppUser } from 'src/app/model/app_user.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TemplateRequest } from 'src/app/model/template_request.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidationserviceService } from 'src/app/service/validationservice.service';

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
  hasOfficeIncomeTraining: Boolean = false;
  dropdownList = [{ item_id: 1, item_text: '6' },
  { item_id: 2, item_text: '7' },
  { item_id: 3, item_text: '8' },];
  dropdownSettings: IDropdownSettings = {}; 
  role: String = sessionStorage.getItem("role") + "";
  manager: String = "";
  dropdownSettingsEmployees: IDropdownSettings = {};
  employeeDropdownList: any = [];
  selectedEmployees: any = [];
  personalTemplate:boolean=true;
  teamTemplate:boolean=false;
  form:FormGroup;
  gbu:any;
  team:any;
  

  constructor(private templateService: TemplateService, private router: Router, private httpClient: HttpClient, private snackBar:MatSnackBar, private validationService:ValidationserviceService) {
    validationService.validate();
    
    this.form=new FormGroup({
      'kitNeeded': new FormControl('',Validators.required),
      'accesFloor': new FormControl('',Validators.required),   
      'requestFor': new FormControl('',Validators.required)
    });
    
   }

  
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

  onSubmit() {

    this.template.requestById = this.userProfile.id;
    this.template.requestForId = (this.role === "ROLE_USER" || this.teamTemplate===false) ? this.userProfile.id : this.selectedEmployees[0].item_id;


    for (let i = 0; i < this.selectedItems.length; i++) {
      this.floorAcces[i] = parseInt(this.selectedItems[i].item_text); //use i instead of 0
    }
    
    console.log(this.floorAcces);
    this.template.floorAccess = this.floorAcces;
    this.template.kitRequired = this.selelectedKitRequired;
    this.submitted = true;
    console.log(this.template);

    this.templateService.createTemplate(this.template).subscribe(
      data => console.log(data), error => this.snackBar.open(error.error.message,"ok",{duration:3000}));
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
      this.hasOfficeIncomeTraining = this.userProfile.hasOfficeIncomeTraining;
      this.gbu=this.userProfile.team.gbu.name;
      this.team=this.userProfile.team.name;

      console.log(this.userProfile);
      if (this.role === 'ROLE_USER') {
        this.manager = this.userProfile.manager.email ? this.userProfile.manager.email : "No manager to display";
      } else if (this.role === 'ROLE_MANAGER') {
        this.httpClient.get<any>("http://localhost:8080/api/v1/profile/" + this.userProfile.team.id, this.httpOptions).subscribe(data => {
          let tempData: any = data;
          let tempList: any = [];
          for (var e of tempData) {
            tempList.push({ item_id: e.id, item_text: e.email });
          }
          this.employeeDropdownList = tempList;
          console.log(this.employeeDropdownList);
          this.employeeDropdownList=this.employeeDropdownList.filter((b:any)=> b.item_text !== sessionStorage.getItem("email")+"");
        })
      }
    })

    if (this.role==='ROLE_USER'|| this.personalTemplate==true ) {
      this.form.controls['requestFor'].clearValidators();
      this.form.controls['requestFor'].updateValueAndValidity();
    }

    
  }

  onItemSelect(item: any) {
    console.log(item);

    console.log(this.findInvalidControls());
  }
  onSelectAll(items: any) {
    console.log(items);
    

  }

  chnageToPersonalTemplate(){
    this.personalTemplate=true;
    this.teamTemplate=false;
    this.form.controls['requestFor'].clearValidators();
    this.form.controls['requestFor'].updateValueAndValidity();
  }

  chnageToTeamTemplate(){
    this.personalTemplate=false;
    this.teamTemplate=true;
    this.form.controls['requestFor'].setValidators([Validators.required])
    this.form.controls['requestFor'].updateValueAndValidity();
  }

  get f (){return this.form.controls}

  public findInvalidControls() {
    const invalid = [];
    const controls = this.form.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return invalid;
}

}
