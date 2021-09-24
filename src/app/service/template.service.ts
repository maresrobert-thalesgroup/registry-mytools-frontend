import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/index";
import { ApiResponse } from '../model/api.response';
import { Template } from '../model/template.model';
import { environment } from 'src/environments/environment';
import { TemplateRequest } from '../model/template_request.model';

@Injectable()
export class TemplateService {

  private baseUrl: string = 'http://localhost:8080/api/v1/templates';
  httpOptions: any;

  constructor(private http: HttpClient) {

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token') + "",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      },
      )
    };
  }


  getTempleates() {
    return this.http.get(this.baseUrl, this.httpOptions);
  }

  getTemplateById(id: number) {
    return this.http.get(this.baseUrl + "/" + id, this.httpOptions);
  }

  getTemplatesByUserId(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/list" + "/" + id, this.httpOptions);

  }

  createTemplate(template: TemplateRequest) {
    return this.http.post(this.baseUrl, template, this.httpOptions);
  }

  updateTemplate(id: number, template: TemplateRequest) {
    return this.http.put(this.baseUrl + "/" + id, template, this.httpOptions);
  }

  deleteTemplate(id: number) {
    return this.http.delete(this.baseUrl + "/" + id, this.httpOptions);
  }
}