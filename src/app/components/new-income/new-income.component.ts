import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/interfaces/auth-data';
import { Income } from 'src/app/interfaces/income';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-new-income',
  templateUrl: './new-income.component.html',
  styleUrls: ['./new-income.component.scss']
})
export class NewIncomeComponent implements OnInit {
  isRecurring = false;
  user!: AuthData | null

  constructor(private toastr: ToastrService, private router: Router, private transactionSrv: TransactionService, private authSrv: AuthService) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) => {
      this.user = user
    })
  }

  createIncome(form: NgForm) {
    if (!form.value.isRecurring) {
      let newIncome: Income = {
        amount: form.value.amount,
        category: form.value.category,
        comment: form.value.comment,
        tag: form.value.tag,
        date: form.value.date,
        isRecurring: form.value.isRecurring,
        accountId: this.user?.user.account.id
      }
      console.log(newIncome)
      this.transactionSrv.saveIncome(newIncome).subscribe({
        next: () => {
          this.toastr.success('Movimento in entrata salvato correttamente'); 
          setTimeout(() => {
           window.location.href="/home"
          }, 1800);

        },
        error: (error) => {
          console.error(error);
          this.toastr.error('Problemi nella creazione della transazione, riprova.');
        }
      })
    }
    else {
      let newRecurringIncome = {
        amount: form.value.amount,
        category: form.value.category,
        comment: form.value.comment,
        tag: form.value.tag,
        isRecurring: form.value.isRecurring,
        accountId: this.user?.user.account.id,
        startDate: form.value.startDate,
        endDate: form.value.endDate,
        intervalDays: form.value.intervalDays
      }
      console.log(newRecurringIncome)
      this.transactionSrv.createRecurringIncome(newRecurringIncome).subscribe({
        next: () => {
          this.toastr.success('Entrata ricorrente creata correttamente');
          setTimeout(() => {
            window.location.reload()
          }, 1800);
        },
        error: (error) => {
          console.error(error);
          this.toastr.error('Problemi nella creazione della transazione, riprova.');
        }
      })
    }

  }
}
