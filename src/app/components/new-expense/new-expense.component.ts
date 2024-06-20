import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/interfaces/auth-data';
import { Expense } from 'src/app/interfaces/expense';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.scss']
})
export class NewExpenseComponent {

  isRecurring = false;
  user!: AuthData | null

  constructor(private toastr: ToastrService, private router: Router, private transactionSrv: TransactionService, private authSrv: AuthService) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) => {
      this.user = user
    })
  }

  createExpense(form: NgForm) {
    if (!form.value.isRecurring) {
      let newExpense: Expense = {
        amount: form.value.amount,
        category: form.value.category,
        comment: form.value.comment,
        tag: form.value.tag,
        date: form.value.date,
        isRecurring: form.value.isRecurring,
        accountId: this.user?.user.account.id
      }
      console.log(newExpense)
      this.transactionSrv.saveExpense(newExpense).subscribe({
        next: () => {
          this.toastr.success('Movimento in uscita salvato correttamente'); 
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
      let newRecurringExpense = {
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
      console.log(newRecurringExpense)
      this.transactionSrv.createRecurringExpense(newRecurringExpense).subscribe({
        next: () => {
          this.toastr.success('Uscita ricorrente creata correttamente');
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
