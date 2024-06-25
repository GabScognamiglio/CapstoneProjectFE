import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncomeDTO } from 'src/app/interfaces/incomeDTO';
import { TransactionService } from 'src/app/services/transaction.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-income-details',
  templateUrl: './income-details.component.html',
  styleUrls: ['./income-details.component.scss']
})
export class IncomeDetailsComponent {
  income!: IncomeDTO | any;
  caricamento = true

  constructor(private transactionSrv: TransactionService, private toastr: ToastrService, private router: ActivatedRoute, private routerN: Router) { }

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      const id = +params['id'];
      this.transactionSrv.getIncomeById(id).subscribe((data) => {
        this.income = data
        console.log(this.income)
      });
    })

    setTimeout(() => {
      this.caricamento = false
    }, 600);
  }

  modificaEntrata(form: NgForm) {

    let moddedIncome = {
      accountId: form.value.accountId,
      amount: form.value.amount,
      tag: form.value.tag,
      comment: form.value.comment,
      date: form.value.date,
      category: form.value.category,
      isRecurring: this.income.recurring
    }

    console.log(moddedIncome)
    this.transactionSrv.updateIncome(this.income.id, moddedIncome).subscribe({
      next: () => {
        this.toastr.success('Transazione modificata con successo');
        
        setTimeout(() => {
          window.location.reload()
        }, 600);
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('È stato riscontrato un problema nella modifica, riprova.');
      }
    });
  }

  deleteEntrata(id: number) {
    this.transactionSrv.deleteIncome(this.income.id).subscribe({
      next: () => {
        this.toastr.success('Transazione eliminata con successo!');
        setTimeout(() => {
          window.location.href="/stats/incomes";
        }, 1800);
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('Problemi nell\'eliminazione della transazione, riprova.');
      }
    })
  }
}
