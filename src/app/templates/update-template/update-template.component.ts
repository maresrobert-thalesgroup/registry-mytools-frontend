import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ApiResponse } from 'src/app/model/api.response';
import { Template } from 'src/app/model/template.model';
import { TemplateService } from 'src/app/service/template.service';

@Component({
  selector: 'app-update-template',
  templateUrl: './update-template.component.html',
  styleUrls: ['./update-template.component.css']
})
export class UpdateTemplateComponent implements OnInit {
  id:number;
  template:any;
  apiResponse:ApiResponse;



  constructor(private router:Router, private templateService:TemplateService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.template=new Template();
    this.id=this.route.snapshot.params['id'];
    this.templateService.getTemplateById(this.id).subscribe(
      data=>{console.log(data)
      this.template=data;
    },
    error=>console.log(error));
  }
 
  onSubmit(){
    this.templateService.updateTemplate(this.id,this.template).subscribe(
      data=>console.log(data),error=>console.error());
      this.template=new Template();
      this.router.navigate(['/navbartemplates/templateslist']);

  }
  


}
