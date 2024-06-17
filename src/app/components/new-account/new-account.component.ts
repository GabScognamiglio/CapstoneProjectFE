import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { Account } from 'src/app/interfaces/account';
import { AuthData } from 'src/app/interfaces/auth-data';
import { AccountService } from 'src/app/services/account.service';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent {

  user!: AuthData | null;

  constructor(private accountSrv: AccountService, private authSrv: AuthService, private toastr:ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) =>
      this.user = user)
  }

  createNewAccount(form:NgForm){
    console.log(form.value)

    let nuovoConto :Account ={
      name: form.value.name,
      description: form.value.description,
      userId: this.user?.user.id as number
    }

    this.accountSrv.createAccount(nuovoConto).subscribe({next: () => {
      
      this.toastr.success('Nuovo conto creato!');this.router.navigate(['/profile-settings/details']);
    },
    error: (error) => {
      console.error(error);
      this.toastr.error('Problemi nella creazione del conto, riprova.');
    }
  });

  }
}
