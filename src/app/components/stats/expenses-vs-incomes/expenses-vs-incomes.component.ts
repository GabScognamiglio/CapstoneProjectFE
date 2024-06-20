import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/interfaces/auth-data';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-expenses-vs-incomes',
  templateUrl: './expenses-vs-incomes.component.html',
  styleUrls: ['./expenses-vs-incomes.component.scss']
})
export class ExpensesVsIncomesComponent {
  user!: AuthData | null
  caricamento = true;

  constructor(private toastr: ToastrService,
    private router: Router,
    private transactionSrv: TransactionService,
    private authSrv: AuthService,
    private accountSrv: AccountService) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) => {
      this.user = user;
      if (user) {
        this.accountSrv.getAccountTotalBalance(this.user?.user.account.id).subscribe((data) => {
          console.log("Totale")
          console.log(data)
        }
        )
        this.accountSrv.getAccountBalanceLast12Months(this.user?.user.account.id).subscribe((data) => {
          console.log("Annuale") //da sistemare a back
          console.log(data)
        }
        )
        this.accountSrv.getAccountBalanceLastMonth(this.user?.user.account.id).subscribe((data) => {
          console.log("Mensile")
          console.log(data)
        }
        )

        this.accountSrv.getAccountBalanceLastWeek(this.user?.user.account.id).subscribe((data) => {
          console.log("Settimanale")
          console.log(data)
        }
        )

        this.accountSrv.getAccountBalancesMonthlyLast12Months(this.user?.user.account.id).subscribe((data) => {
          console.log(data)
        }
        )

        this.accountSrv.getAccountBalancesWeeklyLast4Weeks(this.user?.user.account.id).subscribe((data) =>
          console.log(data)
        )

      }
    })

    setTimeout(() => {
      this.caricamento = false
    }, 600);
  }
}
