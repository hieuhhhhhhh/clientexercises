import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatComponentsModule } from '@app/mat-components/mat-components.module';
import { Expense } from '@app/expense/expense';
import { ExpenseService } from '@app/expense/expense.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-expense-home',
  standalone: true,
  imports: [CommonModule, MatComponentsModule],
  templateUrl: './expense-home.component.html',
})
export class ExpenseHomeComponent implements OnInit {
  msg: string = '';
  displayedColumns: string[] = ['id', 'dateincurred', 'employeeid'];
  dataSource: MatTableDataSource<Expense> = new MatTableDataSource<Expense>();
  constructor(public expenseService: ExpenseService) {}
  ngOnInit(): void {
    this.getAllExpenses();
  }
  getAllExpenses(verbose: boolean = true): void {
    this.expenseService.getAll().subscribe({
      next: (expenses: Expense[]) => (this.dataSource.data = expenses),
      error: (e: Error) =>
        (this.msg = `Failed to load expenses - ${e.message}`),
      complete: () => (verbose ? (this.msg = `Expenses loaded!`) : null),
    });
  }

  sortExpensesWithObjectLiterals(sort: Sort): void {
    const literals = {
      id: () =>
        (this.dataSource.data = this.dataSource.data.sort(
          (a: Expense, b: Expense) =>
            sort.direction === 'asc' ? a.id - b.id : b.id - a.id,
        )),
      employeeid: () =>
        (this.dataSource.data = this.dataSource.data.sort(
          (a: Expense, b: Expense) =>
            sort.direction === 'asc'
              ? a.employeeid - b.employeeid
              : b.employeeid - a.employeeid,
        )),
      dateincurred: () =>
        (this.dataSource.data = this.dataSource.data.sort(
          (a: Expense, b: Expense) =>
            sort.direction === 'asc'
              ? a.dateincurred < b.dateincurred
                ? -1
                : 1
              : b.dateincurred < a.dateincurred
                ? -1
                : 1,
        )),
    };
    literals[sort.active as keyof typeof literals]();
  }
}
