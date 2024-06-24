import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { AuthService } from 'src/app/auth/auth.service';
import { Account } from 'src/app/interfaces/account';
import { AuthData } from 'src/app/interfaces/auth-data';
import { ExpenseDTO } from 'src/app/interfaces/expenseDTO';
import { IncomeDTO } from 'src/app/interfaces/incomeDTO';
import { Ticket } from 'src/app/interfaces/ticket';
import { AccountService } from 'src/app/services/account.service';
import { TicketsService } from 'src/app/services/tickets.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user!: AuthData | null
  account: any;
  monthlyYeasrBalance: any = {}
  weeklyMonthBalance: any = {}
  totalBalance: any = {}
  caricamento = true;
  chartOptionYear!: EChartsOption
  chartOptionMonth!: EChartsOption
  recentExp: ExpenseDTO[] = []
  recentInc: IncomeDTO[] = []

  constructor(private accountSrv: AccountService,
    private authSrv: AuthService,
    private transactionSrv: TransactionService) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) => {
      this.user = user;
      if (user) {
        this.accountSrv.getAccountByUserId(user.user.id).subscribe(
          (data) => {
            this.account = data;
            if (this.account) {
              this.transactionSrv.getRecentExpensesByAccountId(this.account.id).subscribe((data) => {
                this.recentExp = data;
              })

              this.transactionSrv.getRecentIncomesByAccountId(this.account.id).subscribe((data) => {
                this.recentInc = data;
              })

              this.accountSrv.getAccountTotalBalance(this.account.id).subscribe((data) => {
                this.totalBalance = data;
              })
              this.accountSrv.getAccountBalancesMonthlyLast12Months(this.account.id).subscribe((data) => {
                this.monthlyYeasrBalance = data
                this.chartOptionYear = {
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                      type: 'cross'
                    }
                  },
                  xAxis: {
                    type: 'category',
                    data: Object.keys(this.monthlyYeasrBalance).map(item=>item.slice(0,3))
                  },
                  yAxis: {
                    type: 'value',
                    splitLine: {
                      show: false
                    }
                  },
                  series: [{
                    data: Object.values(this.monthlyYeasrBalance).map((item: any) => item.balance),
                    type: 'line',
                    smooth: true,
                    areaStyle: {
                      color: '#3248c3'
                    }
                  }]
                };
              }
              )

              this.accountSrv.getAccountBalancesWeeklyLast4Weeks(this.account.id).subscribe((data) => {
                this.weeklyMonthBalance = data
                this.chartOptionMonth = {
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                      type: 'cross'
                    }
                  },
                  xAxis: {
                    type: 'category',
                    data: Object.keys(this.weeklyMonthBalance)
                  },
                  yAxis: {
                    type: 'value',
                    splitLine: {
                      show: false
                    }
                  },
                  series: [{
                    data: Object.values(this.weeklyMonthBalance).map((item: any) => item.balance),
                    type: 'line',
                    smooth: true,
                    areaStyle: {
                      color: '#3248c3'
                    }
                  }]
                };
              }
              )
            }
          }
        );
      }
    });
    setTimeout(() => {
      this.caricamento = false
    }, 600);
  }

  getCategoryClass(category: string): string {
    switch (category) {
      case 'SPESA': return 'category-spesa';
      case 'SALUTE': return 'category-salute';
      case 'SVAGO': return 'category-svago';
      case 'RISTORANTI': return 'category-ristoranti';
      case 'ISTRUZIONE': return 'category-istruzione';
      case 'REGALI': return 'category-regali';
      case 'FAMIGLIA': return 'category-famiglia';
      case 'ATTIVITA_FISICA': return 'category-attivita-fisica';
      case 'TRASPORTI': return 'category-trasporti';
      case 'ABBONAMENTI': return 'category-abbonamenti';
      case 'AUTO': return 'category-auto';
      case 'OBIETTIVI': return 'category-obiettivi';
      case 'ALTRO': return 'category-altro';
      case 'STIPENDIO': return 'category-stipendio';
      case 'REGALO': return 'category-regalo';
      case 'VINCITA': return 'category-vincita';
      case 'INTERESSI': return 'category-interessi';
      default: return 'category-altro'; // Default class
    }
  }

}
