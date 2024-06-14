import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { AccountDTO } from 'src/app/interfaces/accountDTO';
import { AuthData } from 'src/app/interfaces/auth-data';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  user!: AuthData | null
  accounts!:AccountDTO[] |undefined

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) => {
      this.user = user;
      this.accounts=user?.user.accounts

      console.log(user?.user)
    })
  }
}
