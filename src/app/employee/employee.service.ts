import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';
import { GenericHttpService } from '@app/generic-http.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService extends GenericHttpService<Employee> {
  constructor(httpClient: HttpClient) {
    super(httpClient, `employees`);
  }
}
