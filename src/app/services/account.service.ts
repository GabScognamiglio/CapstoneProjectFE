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

  modificaAccount(id:number|undefined, account:any): Observable<any>{
    return this.http.put<any>(`${this.accountsUrl}/${id}`, account)
  }

  deleteAccount(id:number){
    return this.http.delete(`${this.accountsUrl}/${id}`, { responseType: 'text' as 'json' })
  }




}
