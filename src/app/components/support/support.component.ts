import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/interfaces/auth-data';
import { Ticket } from 'src/app/interfaces/ticket';
import { TicketDTO } from 'src/app/interfaces/ticket-dto';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent {

  user!: AuthData | null;
  tickets: TicketDTO[] = [];

  constructor(private ticketSrv: TicketsService, private authSrv: AuthService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) => {
      this.user = user;
      if (user) {
        //altre get da provare qui sotto
        this.ticketSrv.getTicketsByUserId(user.user.id).subscribe(
          (data) => {
            this.tickets = data;
            this.tickets.sort((a, b) => b.id - a.id)
          }
        );
      }
    });
  }

  deleteTicket(id: number) {
    this.ticketSrv.deleteTicket(id).subscribe({
      next: () => {
        this.toastr.success('Ticket eliminato con successo!');
        setTimeout(() => {
          window.location.reload();
        }, 1800);
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('Problemi nell\'eliminazione del ticket, riprova.');
      }
    })
  }
}
