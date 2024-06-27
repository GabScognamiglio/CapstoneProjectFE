import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  ticketUrl = 'http://localhost:8080/api/gs-budgets/tickets'
  userUrl = 'http://localhost:8080/api/gs-budgets/users'

  constructor(private http: HttpClient) { }

  getUsers(page: number, size: number, sortBy: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy);

    return this.http.get(this.userUrl, { params });
  }

  getTickets(page: number, size: number, sortBy: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy);

    return this.http.get(this.ticketUrl, { params });
  }

  getUserById(id: number) {
    return this.http.get(`${this.userUrl}/${id}`);
  }

  getTicketById(id: number) {
    return this.http.get(`${this.ticketUrl}/${id}`);
  }
}
