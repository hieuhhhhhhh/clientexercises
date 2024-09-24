import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
@Component({
  templateUrl: 'employee-home.component.html',
})
export class EmployeeHomeComponent implements OnInit {
  msg: string;
  employees$?: Observable<Employee[]>;
  employee: Employee;
  hideEditForm: boolean;
  initialLoad: boolean;
  constructor(public employeeService: EmployeeService) {
    this.employee = {
      id: 0,
      title: '',
      firstname: '',
      lastname: '',
      phoneno: '',
      email: '',
    };
    this.msg = '';
    this.hideEditForm = true;
    this.initialLoad = true;
  } // constructor
  ngOnInit(): void {
    this.msg = 'loading employees from server...';
    this.employees$ = this.employeeService.get().pipe(
      tap(() => {
        if (this.initialLoad) {
          this.msg = 'employees loaded!';
          this.initialLoad = false;
        }
      }),
    );
  } // ngOnInit
  select(employee: Employee): void {
    this.employee = employee;
    this.msg = `${employee.lastname} selected`;
    this.hideEditForm = !this.hideEditForm;
  } // select
  /**
   * cancelled - event handler for cancel button
   */
  cancel(): void {
    this.msg = 'Operation cancelled';
    this.hideEditForm = !this.hideEditForm;
  } // cancel
  /**
   * update - send changed update to service
   */
  update(employee: Employee): void {
    this.employeeService.update(employee).subscribe({
      // Create observer object
      next: (emp: Employee) => (this.msg = `Employee ${emp.id} updated!`),
      error: (err: Error) => (this.msg = `Update failed! - ${err.message}`),
      complete: () => (this.hideEditForm = !this.hideEditForm),
    });
  } // update
} // EmployeeHomeComponent
