import { transition } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from '../service/authentication.service';


export class GBU{
  constructor(
    public id:number,
    public name: string
  ){}
}

export class Team{
  constructor(
    public id:number,
    public name: string,
    public gbu_id: number
  ){}
}

@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.css']
})

export class RegisterformComponent implements OnInit {

  registerForm:FormGroup; //form
  gbus:GBU[]=[];
  teams:Team[]=[];
  editable:boolean=false;
  emailInUse:boolean=false;
  tmpteams:any;

  constructor(private formBuilder:FormBuilder, private router:Router, private httpClient:HttpClient, private authenticationService: AuthenticationService){
    this.registerForm = this.formBuilder.group({
      "email": new FormControl(null,[Validators.required,Validators.email]),
      "firstName":new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      "lastName": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      "gbu": new FormControl('select gbu',[Validators.required]),
      "team": new FormControl(null,[Validators.required]),
      "password":new FormControl(null,[Validators.required,Validators.minLength(6)]),
      "confirmpassword":new FormControl(null,[Validators.required]),
      "hasOfficeIncomeTraining":new FormControl(false),
      "role":"USER_ROLE"
    },
  {
    validators:this.MustMatch('password','confirmpassword')
  })
  }

  ngOnInit(): void {
    this.getGBUS();
    this.getTeams();
  }

  MustMatch(controlName:string,matchingControlName:string) {
    return(formGroup:FormGroup)=>{
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if(matchingControl.errors && !matchingControl.errors.MustMatch){
        return
      }
      if(control.value !== matchingControl.value){
        matchingControl.setErrors({MustMatch:true})
      }
      else{
        matchingControl.setErrors(null);
      }
    }
  }

  //submit function
  submitData(){
    this.emailInUse = false;

    console.log(this.registerForm.value)

    if(this.registerForm.valid)
    {
      let teamId = this.teams.filter(t => t.name === this.registerForm.get(['team'])?.value);
      this.registerForm.controls['team'].setValue(teamId[0].id);
      this.httpClient.post<any>("http://localhost:8080/api/v1/registration", this.registerForm.value).subscribe(
        data=>{
          console.log(data);
          this.authenticationService.authenticate(this.registerForm.get(["email"])?.value, this.registerForm.get(["password"])?.value).subscribe(
            data=>{
              this.router.navigate(['']);
            }
          );
        },
        error=>{
          if(error.status === 500){
            this.emailInUse = true;
            console.log(error);
          } else{
            console.log(error);
          }
        }
      )
    }
  }

  getGBUS(){
    this.httpClient.get<any>("http://localhost:8080/api/v1/gbu").subscribe(data=>{
      this.gbus=data;
    })

    
  }

  getTeams(){
    this.httpClient.get<any>("http://localhost:8080/api/v1/team").subscribe(data=>{
      this.teams=data;
    })
  }

  get f (){return this.registerForm.controls}
  
  updateTeams(gbuId:any){
  this.getTeams()
  this.tmpteams = this.teams.filter(e=> e.gbu_id == gbuId)
  }

}
