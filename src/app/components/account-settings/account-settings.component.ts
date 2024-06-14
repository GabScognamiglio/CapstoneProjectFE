import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/interfaces/auth-data';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent{

  // user!: AuthData | null

  // constructor(private authSrv: AuthService, private router:Router  ) { }

  // ngOnInit(): void {
  //   this.authSrv.user$.subscribe((user) => {
  //     this.user = user
  //     console.log(this.user?.user)
  //   })


  // }

}
