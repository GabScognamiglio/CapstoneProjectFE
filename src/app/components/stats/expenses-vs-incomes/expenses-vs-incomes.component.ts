import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EChartsOption } from 'echarts';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/interfaces/auth-data';
import { Expense } from 'src/app/interfaces/expense';
import { ExpenseDTO } from 'src/app/interfaces/expenseDTO';
import { IncomeDTO } from 'src/app/interfaces/incomeDTO';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-expenses-vs-incomes',
  templateUrl: './expenses-vs-incomes.component.html',
  styleUrls: ['./expenses-vs-incomes.component.scss']
})
export class ExpensesVsIncomesComponent {
  user!: AuthData | null;
  monthlyYeasrBalance: any = {}
  weeklyMonthBalance: any = {}
  yearBalance: any = {}
  monthBalance: any = {}
  caricamento = true;
  chartOptionYear!: EChartsOption
  chartOptionMonth!: EChartsOption
  expenses:any[] =[];
  incomes:any[]=[];
  highestExp!:ExpenseDTO;
  highestInc!:IncomeDTO;
  categoryDataMap: Map<string, { totalAmount: number, percentage: number }> = new Map();
  restaurantData: { totalAmount: number; percentage: number; } | undefined;

  constructor(private toastr: ToastrService,
    private router: Router,
    private transactionSrv: TransactionService,
    private authSrv: AuthService,
    private accountSrv: AccountService) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) => {
      this.user = user;
      if (user) {
        this.accountSrv.getAccountBalanceLast12Months(this.user?.user.account.id).subscribe((data) => {
          this.yearBalance=data
        }
        )
        this.accountSrv.getAccountBalanceLastMonth(this.user?.user.account.id).subscribe((data) => {
          this.monthBalance=data
        }
        )
        this.accountSrv.getAccountBalancesMonthlyLast12Months(this.user?.user.account.id).subscribe((data) => {
          // console.log(data)
          this.monthlyYeasrBalance = data;
          this.chartOptionYear = {
            title: {
              text: 'Spese vs. Entrate ultimo anno',
              left: 'center',
              top: '0%',
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: ['Entrate', 'Uscite'],
              top: '8%',
              left: 'center',
              orient: 'horizontal',
              itemGap: 10,
              textStyle: {
                fontSize: 10
              }
            },
            xAxis: {
              type: 'category',
              data: Object.keys(this.monthlyYeasrBalance).map(item => item.slice(0, 3))
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: 'Entrate',
                type: 'bar',
                barGap: 0,
                barCategoryGap: '20%',
                barMaxWidth: 30,
                itemStyle: {
                  color: '#122ca9'
                },
                data: Object.values(this.monthlyYeasrBalance).map((item: any) => item.totalIncome)
              },
              {
                name: 'Uscite',
                type: 'bar',
                barMaxWidth: 30,
                itemStyle: {
                  color: '#0c1233'
                },
                data: Object.values(this.monthlyYeasrBalance).map((item: any) => item.totalExpense)
              }
            ]
          };
        }
        )
        this.accountSrv.getAccountBalancesWeeklyLast4Weeks(this.user?.user.account.id).subscribe((data) =>{
          // console.log(data)
        this.weeklyMonthBalance = data;
        this.chartOptionMonth = {
          title: {
            text: 'Spese vs. Entrate ultimo mese',
            left: 'center',
            top: '0%',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['Entrate', 'Uscite'],
            top: '8%',
            left: 'center',
            orient: 'horizontal',
            itemGap: 10,
            textStyle: {
              fontSize: 10
            }
          },
          xAxis: {
            type: 'category',
            data: Object.keys(this.weeklyMonthBalance)
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: 'Entrate',
              type: 'bar',
              barGap: 0,
              barCategoryGap: '20%',
              barMaxWidth: 30,
              itemStyle: {
                color: '#122ca9'
              },
              data: Object.values(this.weeklyMonthBalance).map((item: any) => item.totalIncome)
            },
            {
              name: 'Uscite',
              type: 'bar',
              itemStyle: {
                color: '#0c1233'
              },
              barMaxWidth: 30,
              data: Object.values(this.weeklyMonthBalance).map((item: any) => item.totalExpense)
            }
          ]
        };
        }
        )
        this.transactionSrv.getExpensesByAccountId(this.user?.user.account.id).subscribe((data)=>{
          this.expenses=data
          this.highestExp = this.expenses.reduce((prev, current) =>
            (prev.amount > current.amount) ? prev : current
          );
          this.calculateCategoryData();
          this.restaurantData = this.categoryDataMap.get('RISTORANTI');
          
        })
        this.transactionSrv.getIncomesByAccountId(this.user?.user.account.id).subscribe((data)=>{
          this.incomes=data
        })
      }

    })

    setTimeout(() => {
      this.caricamento = false
    }, 600);
  }

  calculateCategoryData() {
    let totalExpense = 0;
    const categoryMap = new Map<string, number>();
    this.expenses.forEach(expense => {
      if (categoryMap.has(expense.category)) {
        categoryMap.set(expense.category, categoryMap.get(expense.category)! + expense.amount);
      } else {
        categoryMap.set(expense.category, expense.amount);
      }
      totalExpense += expense.amount;
    });

    categoryMap.forEach((amount, category) => {
      const percentage = (amount / totalExpense) * 100;
      this.categoryDataMap.set(category, { totalAmount: amount, percentage: percentage });
    });
  }

  getCategoryClass(category: any): string {
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