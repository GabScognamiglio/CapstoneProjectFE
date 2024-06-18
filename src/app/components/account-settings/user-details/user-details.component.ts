import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { Account } from 'src/app/interfaces/account';
import { AccountDTO } from 'src/app/interfaces/accountDTO';
import { AuthData } from 'src/app/interfaces/auth-data';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  user!: AuthData | null
  account: any
  caricamento=true

  constructor(private authSrv: AuthService, private router: Router, private accountSrv: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.authSrv.user$.subscribe((user) => {
      this.user = user;
      if (user) {
        this.accountSrv.getAccountByUserId(user.user.id).subscribe(
          (data) => {
            this.account = data;
          }
        );
      }
    });
    setTimeout(() => {
      this.caricamento=false;
    }, 200);
  }
  


  // deleteAccount(id: number) {
  //   const index = this.accounts.findIndex((account: AccountDTO) => account.id === id);
  //   let removedAccount: AccountDTO | undefined;
  //   if (index !== -1) {
  //     removedAccount = this.accounts.splice(index, 1)[0];
  //   }
  //   this.accountSrv.deleteAccount(id).subscribe({
  //     next: () => {
  //       this.toastr.success('Conto eliminato con successo!');
  //       window.location.reload()
  //     },
  //     error: (error) => {
  //       console.error(error);
  //       this.toastr.error('Problemi nell\'eliminazione del conto, riprova.');
  //       if (removedAccount) {
  //         this.accounts.push(removedAccount);
  //         if (this.user && this.user.user && this.user.user.accounts) {
  //           this.user.user.accounts = [...this.accounts] as [];
  //         }
  //       }
  //     }
  //   });
  // }


  updateAccount(accountId: number | undefined, form:NgForm){
    console.log(form.value)

    let contoMod :Account ={
      name: form.value.name,
      description: form.value.description,
      userId: this.user?.user.id as number
    }

    this.accountSrv.updateAccount(accountId, contoMod).subscribe({next: () => {
      
      this.toastr.success('Conto modificato con successo.');
      setTimeout(() => {
        window.location.reload();
      }, 1800);
    },
    error: (error) => {
      console.error(error);
      this.toastr.error('Problemi nella modifica del conto, riprova.');
    }
  });
  }
}

