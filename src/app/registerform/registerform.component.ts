import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.css']
})
export class RegisterformComponent implements OnInit {

  registerForm:FormGroup; //form
  gbus:string[]=["India","England","Australia"];
  teams:string[]=[];
  indTeams:string[]=["A","B","C"];
  engTeams:string[]=["D","E","F"];
  ausTeams:string[]=["G","H","I"];
  editable:boolean=false;
  emailInUse:boolean=false;

  constructor(private formBuilder:FormBuilder, private router:Router, private httpClient:HttpClient){
    this.registerForm = this.formBuilder.group({
      "email": new FormControl(null,[Validators.required,Validators.email]),
      "firstName":new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      "lastName": new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      "gbu": new FormControl('select gbu',[Validators.required]),
      "team": new FormControl(null,[Validators.required]),
      "password":new FormControl(null,[Validators.required,Validators.minLength(6)]),
      "confirmpassword":new FormControl(null,[Validators.required]),
      "role":"USER_ROLE"
    },
  {
    validators:this.MustMatch('password','confirmpassword')
  })
  }

  ngOnInit(): void {
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
      this.httpClient.post<any>("http://localhost:8080/api/v1/registration", this.registerForm.value).subscribe(
        data=>{
          console.log(data)
        },
        error=>{
          if(error.status === 500){
            this.emailInUse = true;
            console.log(error);
          } else if(error.status === 200){
            this.router.navigate(['/login']);
            console.log(error);
          }
        }
      )
    }
  }

  get f (){return this.registerForm.controls}
  
  updateTeams(gbuName:any){
    switch(gbuName){
      case 'India':
        this.teams=this.indTeams;
        break;
      case 'England':
        this.teams=this.engTeams;
        break;
      case 'Australia':
        this.teams=this.ausTeams;
        break;
      default:
        this.teams=[]
        break;

    }
  }


}
