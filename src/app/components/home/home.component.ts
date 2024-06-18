import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { AuthService } from 'src/app/auth/auth.service';
import { Account } from 'src/app/interfaces/account';
import { AuthData } from 'src/app/interfaces/auth-data';
import { Ticket } from 'src/app/interfaces/ticket';
import { AccountService } from 'src/app/services/account.service';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user!: AuthData | null
  account: any;
  monthlyYeasrBalance: any = {}
  totalBalance: any = {}
  caricamento = true;
  chartOption!: EChartsOption

  constructor(private accountSrv: AccountService, private authSrv: AuthService) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) => {
      this.user = user;
      if (user) {
        this.accountSrv.getAccountByUserId(user.user.id).subscribe(
          (data) => {
            this.account = data;
            // console.log(this.account);
            if (this.account) {

              this.accountSrv.getAccountTotalBalance(this.account.id).subscribe((data) => {
                this.totalBalance = data;
              })
              this.accountSrv.getAccountBalancesMonthlyLast12Months(this.account.id).subscribe((data) => {
                this.monthlyYeasrBalance = data
                // console.log(this.monthlyYeasrBalance)
                this.chartOption = {
                  xAxis: {
                    type: 'category',
                    data: Object.keys(this.monthlyYeasrBalance)
                  },
                  yAxis: {
                    type: 'value'
                  },
                  series: [{
                    data: Object.values(this.monthlyYeasrBalance).map((item:any) => item.balance),
                    type: 'line'
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




  // mockData = {
  //   "JUNE 2023": { "balance": 1850, "totalIncome": 0, "totalExpense": 0 },
  //   "JULY 2023": { "balance": 120, "totalIncome": 0, "totalExpense": 0 },
  //   "AUGUST 2023": { "balance": 5000, "totalIncome": 0, "totalExpense": 0 },
  //   "SEPTEMBER 2023": { "balance": 870, "totalIncome": 0, "totalExpense": 0 },
  //   "OCTOBER 2023": { "balance": 406, "totalIncome": 0, "totalExpense": 0 },
  //   "NOVEMBER 2023": { "balance": 1250, "totalIncome": 0, "totalExpense": 0 },
  //   "DECEMBER 2023": { "balance": 1140, "totalIncome": 0, "totalExpense": 0 },
  //   "JANUARY 2024": { "balance": 900, "totalIncome": 0, "totalExpense": 0 },
  //   "FEBRUARY 2024": { "balance": 1000, "totalIncome": 0, "totalExpense": 0 },
  //   "MARCH 2024": { "balance": 400, "totalIncome": 0, "totalExpense": 0 },
  //   "APRIL 2024": { "balance": 600, "totalIncome": 0, "totalExpense": 0 },
  //   "MAY 2024": { "balance": 800, "totalIncome": 0, "totalExpense": 0 }
  // };


  // graphicData = this.mockData;


}





// if(this.account){
//   console.log("***ARRIVA TUTTOOOO***")
// this.accountSrv.getAccountTotalBalance(this.account.id).subscribe((data) =>
//   {console.log("Totale")
//   console.log(data)
//     this.totalBalance=data;
// }
// )

// this.accountSrv.getAccountBalanceLast12Months(this.account.id).subscribe((data) =>
//   {console.log("Annuale")
//   console.log(data)}
// )

// this.accountSrv.getAccountBalanceLastMonth(this.account.id).subscribe((data) =>
//  { console.log("Mensile")
//   console.log(data)}
// )

// this.accountSrv.getAccountBalanceLastWeek(this.account.id).subscribe((data) =>
//   {console.log("Setimanale")
//   console.log(data)}
// )

// this.accountSrv.getAccountBalancesMonthlyLast12Months(this.account.id).subscribe((data) =>{
//   this.monthlyYeasrBalance=data
// console.log(this.monthlyYeasrBalance)}
// )

// this.accountSrv.getAccountBalancesWeeklyLast4Weeks(this.account.id).subscribe((data) =>
//   console.log(data)
// )
// }