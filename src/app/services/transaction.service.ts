import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExpenseDTO } from '../interfaces/expenseDTO';
import { IncomeDTO } from '../interfaces/incomeDTO';
import { Expense } from '../interfaces/expense';
import { Income } from '../interfaces/income';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  expenseUrl = 'http://localhost:8080/api/gs-budgets/expenses';
  incomeUrl = 'http://localhost:8080/api/gs-budgets/incomes';

  constructor(private http: HttpClient) {
  }

  // EXPENSES

  getExpensesByAccountId(accountId: number) {
    return this.http.get<ExpenseDTO[]>(`${this.expenseUrl}/account/${accountId}`)
  }

  getExpenseById(id: number) {
    return this.http.get<ExpenseDTO>(`${this.expenseUrl}/${id}`)
  }

  saveExpense(expense: Expense) {
    return this.http.post<ExpenseDTO[]>(this.expenseUrl, expense)
  }

  updateExpense(id: number, expense: Expense) {
    return this.http.put(`${this.expenseUrl}/${id}`, expense)
  }

  deleteExpense(id: number) {
    return this.http.delete(`${this.expenseUrl}/${id}`)
  }


  // INCOMES

  getIncomesByAccountId(accountId: number) {
    return this.http.get<IncomeDTO[]>(`${this.incomeUrl}/account/${accountId}`)
  }

  getIncomeById(id: number) {
    return this.http.get<IncomeDTO>(`${this.incomeUrl}/${id}`)
  }

  saveIncome(income: Income) {
    return this.http.post<IncomeDTO[]>(this.incomeUrl, income)
  }

  updateIncome(id: number, income: Income) {
    return this.http.put(`${this.incomeUrl}/${id}`, income)
  }

  deleteIncome(id: number) {
    return this.http.delete(`${this.incomeUrl}/${id}`)
  }
}
