import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class Employee{
  constructor(
    public empId: string,
    public name: string,
    public role: string
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {

  constructor(private httpClient: HttpClient) { }
}
