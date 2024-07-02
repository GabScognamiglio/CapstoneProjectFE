import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl='http://localhost:8080/api/gs-budgets/users'

  constructor(private http: HttpClient) { }

  modificaUtente(id:number|undefined, user:any): Observable<any>{
    return this.http.put<any>(`${this.userUrl}/${id}`, user)
  }
}
