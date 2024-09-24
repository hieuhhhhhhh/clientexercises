import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
@Component({
  templateUrl: 'employee-home.component.html',
})
export class EmployeeHomeComponent implements OnInit {
  msg: string;
  employees$?: Observable<Employee[]>;
  loaded: boolean;
  constructor(public employeeService: EmployeeService) {
    this.msg = '';
    this.loaded = false;
  } // constructor
  ngOnInit(): void {
    this.msg = 'Loading employees from server...';
    this.employees$ = this.employeeService.get().pipe(
      tap(() => {
        if (!this.loaded) {
          this.msg = 'Employees loaded via async pipe';
          this.loaded = true;
        }
      }),
    );
  } // ngOnInit
} // EmployeeHomeComponent
