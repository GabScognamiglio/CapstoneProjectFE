import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Account } from '../interfaces/account';
import { AuthData } from '../interfaces/auth-data';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  accountsUrl = 'http://localhost:8080/api/gs-budgets/accounts'

  constructor(private http: HttpClient) { }

  getAccountsByUserId(userId:number) {
      return this.http.get<Account[]>(`${this.accountsUrl}/user/${userId}`)
  }

  updateAccount(id:number|undefined, account:any): Observable<any>{
    return this.http.put<any>(`${this.accountsUrl}/${id}`, account)
  }

  deleteAccount(id:number){
    return this.http.delete(`${this.accountsUrl}/${id}`, { responseType: 'text' as 'json' })
  }


  createAccount(account:Account) {
    return this.http.post(this.accountsUrl, account, { responseType: 'text' as 'json' })
  }




  getAccountTotalBalance(accountId:number){
    return this.http.get(`${this.accountsUrl}/${accountId}/total-balance`)
  }

  getAccountBalanceLast12Months(accountId:number){
    return this.http.get(`${this.accountsUrl}/${accountId}/last-year-balance`)
  }

  getAccountBalanceLastMonth(accountId:number){
    return this.http.get(`${this.accountsUrl}/${accountId}/last-month-balance`)
  }

  getAccountBalanceLastWeek(accountId:number){
    return this.http.get(`${this.accountsUrl}/${accountId}/last-week-balance`)
  }

  getAccountBalancesMonthlyLast12Months(accountId:number){
    return this.http.get(`${this.accountsUrl}/${accountId}/monthly-year-balance`)
  }

  getAccountBalancesWeeklyLast4Weeks(accountId:number){
    return this.http.get(`${this.accountsUrl}/${accountId}/weekly-month-balance`)
  }


}
