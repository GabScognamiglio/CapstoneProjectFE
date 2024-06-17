import { Component, OnInit } from '@angular/core';
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
  accounts: Account[] = [];


  constructor(private accountSrv: AccountService, private authSrv: AuthService) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) => {
      this.user = user;
      if (user) {
        this.accountSrv.getAccountsByUserId(user.user.id).subscribe(
          (data) => {
            this.accounts = data;
          }
        );
      }
    });
    // prove
    console.log("***ARRIVA TUTTOOOO***")
    this.accountSrv.getAccountTotalBalance(4).subscribe((data) =>
      {console.log("Totale")
      console.log(data)}
    )
    
    this.accountSrv.getAccountBalanceLast12Months(4).subscribe((data) =>
      {console.log("Annuale")
      console.log(data)}
    )
    
    this.accountSrv.getAccountBalanceLastMonth(4).subscribe((data) =>
     { console.log("Mensile")
      console.log(data)}
    )
    
    this.accountSrv.getAccountBalanceLastWeek(4).subscribe((data) =>
      {console.log("Setimanale")
      console.log(data)}
    )

    this.accountSrv.getAccountBalancesMonthlyLast12Months(4).subscribe((data) =>
      console.log(data)
    )

    this.accountSrv.getAccountBalancesWeeklyLast4Weeks(4).subscribe((data) =>
      console.log(data)
    )


  }


}

