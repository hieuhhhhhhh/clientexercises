import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../constants';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Employee } from './employee';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  resourceURL: string;
  status: string;
  constructor(public http: HttpClient) {
    this.resourceURL = `${BASE_URL}/api/employees`;
    this.status = '';
  } // constructor
  /**
   * Retrieves the employeee JSON, then returns the array to a subscriber
   */
  get(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(this.resourceURL)
      .pipe(retry(1), catchError(this.handleError));
  } // get
  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    error.error instanceof ErrorEvent
      ? // Get client-side error
        (errorMessage = error.error.message)
      : // Get server-side error
        (errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`);
    window.alert(errorMessage); // probably should console.log when going into production
    return throwError(() => errorMessage);
  }
} // EmployeeService
