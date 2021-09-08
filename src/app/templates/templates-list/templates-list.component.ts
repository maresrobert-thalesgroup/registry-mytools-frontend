import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  filtersLoaded: Promise<boolean> = Promise.resolve(false);;

  constructor(private templateService:TemplateService, private router:Router) { }

  ngOnInit(): void {
    this.templateService.getTempleates().subscribe(
      data=>{console.log(data);
      this.templates=data;
      for (let i = 0; i < this.templates.length; i++) {
        this.templates[i].floorAccess = this.templates[i].floorAccess as String[]; //use i instead of 0
      }
      this.filtersLoaded = Promise.resolve(true);


  },
  error=>  console.error(error));
    $(function(){
      $('#datatable-example').DataTable();
    });
  }

  deleteTemplate(id:number){
    console.log(id);
    this.templateService.deleteTemplate(id).subscribe(
      data=>{console.log(data);
        this.templateService.getTempleates().subscribe(
          data=>{console.log(data);
          this.templates=data;});
  },
  error=>  console.error(error));
}

  updateTemplate(id:number){
    this.router.navigate(['/navbartemplates/updatetemplate',id]);
  }
  

}
