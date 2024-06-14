import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/interfaces/auth-data';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {

  user!: AuthData | null

  constructor(private authSrv: AuthService, private router:Router ) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) => {
      this.user = user
    })
  }

  modUtente(form:NgForm) {
    if(form.value.password == form.value.confermaPassword) {
      console.log(form.value)
    } else {
      console.error("Password non coincidono")
    }
    
  }
}
