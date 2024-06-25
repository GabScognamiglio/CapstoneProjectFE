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

  login(form: NgForm) {
    this.authSrv.login(form.value).subscribe({
      next: () => {
        this.toastr.success('Login completato!'); this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error(error);
        if (error == "Wrong password!") {
          this.toastr.error('Password errata, riprova.');
        } else {
          this.toastr.error('Login fallito. Per favore controlla le tue credenziali e riprova.');
        }

      }
    });
  }
}
