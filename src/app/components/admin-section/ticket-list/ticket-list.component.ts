import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent {
  tickets: any[] = [];
  page: number = 0;
  size: number = 10;
  sortBy: string = 'id';
  totalPages: number = 0;
  caricamento = true;
  filterStatus: string = 'ALL';

  constructor(private adminSrv: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadUsers();
    setTimeout(() => {
      this.caricamento = false
    }, 600);
  }

  loadUsers(): void {
    this.adminSrv.getTickets(this.page, this.size, this.sortBy).subscribe(data => {
      this.tickets = data.content;
      this.totalPages = data.totalPages; console.log(this.tickets)
    });
  }

  onPageChange(page: number): void {
    this.page = page;
    this.loadUsers();
  }

  patchRisposta(id: number, form: NgForm) {
    console.log(form.value)
    this.adminSrv.patchAdminAnswer(id, form.value).subscribe({
      next: () => {
        this.toastr.success('Risposta inserita correttamente correttamente');
        setTimeout(() => {
          window.location.reload()
        }, 1800);

      },
      error: (error) => {
        console.error(error);
        this.toastr.error('Problemi nel salvataggio della risposta, riprova.');
      }
    })
  }

  filterTickets(): any[] {
    if (this.filterStatus === 'ALL') {
      return this.tickets;
    }
    return this.tickets.filter(ticket => ticket.status === this.filterStatus);
  }

  setFilterStatus(status: string): void {
    this.filterStatus = status;
  }
}
