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
            console.log(this.accounts);
          }
        );
      }
    });
  }


}

