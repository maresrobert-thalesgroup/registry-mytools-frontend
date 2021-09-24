import { Component, OnInit } from '@angular/core';
import { ValidationserviceService } from '../service/validationservice.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  constructor(private validationService:ValidationserviceService) {
    validationService.validate();
  }

  ngOnInit(): void {
  }

}
