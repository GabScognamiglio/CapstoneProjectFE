import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/interfaces/auth-data';
import { Ticket } from 'src/app/interfaces/ticket';
import { TicketsService } from 'src/app/services/tickets.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.scss']
})
export class NewTicketComponent {

  user!: AuthData | null;

  constructor(private ticketSrv: TicketsService, private authSrv: AuthService, private toastr:ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) =>
      this.user = user)
  }

  createTicket(form: NgForm){
    
    let finalForm:any={
      object: form.value.object as string,
      description: form.value.description as string,
      userId: this.user?.user.id
    }
    this.ticketSrv.createNewTicket(finalForm).subscribe({next: () => {
      this.toastr.success('Ticket creato!');this.router.navigate(['/support']);
    },
    error: (error) => {
      console.error(error);
      this.toastr.error('Problemi nella creazione del ticket, riprova.');
    }
  });
  }

}
