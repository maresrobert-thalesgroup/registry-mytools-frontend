import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { ApiResponse } from 'src/app/model/api.response';
import { TemplateService } from 'src/app/service/template.service';

@Component({
  selector: 'app-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.css']
})
export class TemplatesListComponent implements OnInit {

  //templates:Observable<ApiResponse>;
  templates:any;
  floors: String[] = [];
  userId:number;
  dataLoaded:boolean=false;
  templates2:Observable<any>;
  sub:Subscription;

  constructor(private templateService:TemplateService, private router:Router, private route:ActivatedRoute) {

   }

  ngOnInit(): void {

    this.userId= Number(sessionStorage.getItem("id"));

    this.templates2=this.templateService.getTemplatesByUserId(this.userId);

    console.log(this.userId);
     this.sub=this.templates2.subscribe(
       data=>{console.log(data);
       //this.templatesObs.
       //this.dataLoaded=true;
     
   },
   error=>  console.error(error));
     $(function(){
       $('#datatable-example').DataTable();
     });
  }
/*
  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['templates']) {
        //  This is always outputting my original insights, not the filtered list
        console.log(this.templates)
    }
}
*/

   ngOnDestroy(){
    this.sub.unsubscribe();
   }

  deleteTemplate(id:number){
    console.log(id);
    this.templateService.deleteTemplate(id).subscribe(
      data=>{console.log(data);
        this.templateService.getTemplatesByUserId(this.userId).subscribe(
          data=>{console.log(data);
          this.templates=data;});
  },
  error=>  console.error(error));
}

  updateTemplate(id:number){
    this.router.navigate(['/navbartemplates/updatetemplate',id]);
  }

  applyTemplate(id:number){
    this.router.navigate(['/bookadesk',{templateId:id}]);
  }
  

}
