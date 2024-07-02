import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../interfaces/ticket';
import { TicketDTO } from '../interfaces/ticket-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  ticketsUrl = 'http://localhost:8080/api/gs-budgets/tickets'

  constructor(private http: HttpClient) { }

  getTicketsByUserId(userId: number) {
    return this.http.get<TicketDTO[]>(`${this.ticketsUrl}/user/${userId}`)
  }


  createNewTicket(ticket: any): Observable<any>{
    return this.http.post<Ticket>(this.ticketsUrl, ticket, { responseType: 'text' as 'json' })
  }


  deleteTicket(id:number){
    return this.http.delete(`${this.ticketsUrl}/${id}`, { responseType: 'text' as 'json' })
  }
}
