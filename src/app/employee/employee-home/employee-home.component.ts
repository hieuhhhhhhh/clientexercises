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
  todo: string;
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
    this.todo = '';
  } // constructor

  ngOnInit(): void {
    this.msg = `Loading...`;
    this.getAll();
  } // ngOnInit
  /**
   * getAll - retrieve everything
   */
  getAll(): void {
    this.employees$ = this.employeeService.getAll();
    this.employees$.subscribe({
      error: (e: Error) => (this.msg = `Couldn't get employees - ${e.message}`),
      complete: () => (this.msg = `Employees loaded!`),
    });
  } // getAll

  select(employee: Employee): void {
    this.todo = 'update';
    this.employee = employee;
    this.msg = `${employee.lastname} selected`;
    this.hideEditForm = !this.hideEditForm;
  } // select
  /**
   * cancelled - event handler for cancel button
   */
  cancel(msg?: string): void {
    msg ? (this.msg = 'Operation cancelled') : null;
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
  /**
   * save - determine whether we're doing and add or an update
   */
  save(employee: Employee): void {
    employee.id ? this.update(employee) : this.add(employee);
  } // save
  /**
   * add - send employee to service, receive new employee back
   */
  add(employee: Employee): void {
    employee.id = 0;
    this.employeeService.update(employee).subscribe({
      // Create observer object
      next: (emp: Employee) => {
        this.msg = `Employee ${emp.id} added!`;
      },
      error: (err: Error) =>
        (this.msg = `Employee not added! - ${err.message}`),
      complete: () => (this.hideEditForm = !this.hideEditForm),
    });
  } // add
  /**
   * delete - send employee id to service for deletion
   */
  delete(employee: Employee): void {
    this.employeeService.delete(employee.id).subscribe({
      // Create observer object
      next: (numOfEmployeesDeleted: number) => {
        numOfEmployeesDeleted === 1
          ? (this.msg = `Employee ${employee.lastname} deleted!`)
          : (this.msg = `employee not deleted`);
      },
      error: (err: Error) => (this.msg = `Delete failed! - ${err.message}`),
      complete: () => (this.hideEditForm = !this.hideEditForm),
    });
  } // delete
  /**
   * newEmployee - create new employee instance
   */
  newEmployee(): void {
    this.employee = {
      id: 0,
      title: '',
      firstname: '',
      lastname: '',
      phoneno: '',
      email: '',
    };
    this.hideEditForm = !this.hideEditForm;
    this.msg = 'New Employee';
  } // newEmployee
} // EmployeeHomeComponent
