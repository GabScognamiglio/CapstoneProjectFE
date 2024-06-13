import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { timeout } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authSrv: AuthService, private router: Router, private toastr: ToastrService) { }

  // login(form:NgForm){
  //   try {
  //     this.authSrv.login(form.value).subscribe();
  //       this.toastr.success('Login completato!');
  //       setTimeout(() => {
  //         this.router.navigate(['/home']);
  //       }, 2000);
  //   } catch (error) {
  //     console.error(error)
  //     return
  //   }
  // }

  login(form: NgForm) {
    this.authSrv.login(form.value).subscribe({
      next: () => {
        this.toastr.success('Login completato!');this.router.navigate(['/home']);
        setTimeout(() => {
          
        }, 400);
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('Login fallito. Per favore controlla le tue credenziali e riprova.');
      }
    });
  }
}
