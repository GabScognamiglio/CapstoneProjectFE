import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExpenseDTO } from 'src/app/interfaces/expenseDTO';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.scss']
})
export class ExpenseDetailsComponent {
  expense!: ExpenseDTO | any;

  caricamento = true

  constructor(private transactionSrv: TransactionService, private toastr: ToastrService, private router: ActivatedRoute, private routerN: Router) { }

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      const id = +params['id'];
      this.transactionSrv.getExpenseById(id).subscribe((data) => {
        this.expense = data
        console.log(this.expense)
      });
    })

    setTimeout(() => {
      this.caricamento = false
    }, 600);
  }

  modificaUscita(form: NgForm) {

    let moddedexpense = {
      accountId: form.value.accountId,
      amount: form.value.amount,
      tag: form.value.tag,
      comment: form.value.comment,
      date: form.value.date,
      category: form.value.category,
      isRecurring: this.expense.recurring
    }

    console.log(moddedexpense)
    this.transactionSrv.updateExpense(this.expense.id, moddedexpense).subscribe({
      next: () => {
        this.toastr.success('Transazione modificata con successo');
        window.location.reload()
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('È stato riscontrato un problema nella modifica, riprova.');
      }
    });
  }

  deleteUscita(id: number) {
    this.transactionSrv.deleteExpense(this.expense.id).subscribe({
      next: () => {
        this.toastr.success('Transazione eliminata con successo!');
        setTimeout(() => {
          window.location.href="/stats/expenses";
        }, 1800);
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('Problemi nell\'eliminazione della transazione, riprova.');
      }
    })
  }
}
