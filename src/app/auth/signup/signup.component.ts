import { Component } from '@angular/core';
import { SignUp } from 'src/app/interfaces/sign-up';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  userReg!: SignUp;


  constructor(private authSrv: AuthService, private router: Router, private toastr: ToastrService) { }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.authSrv.signup(form.value).subscribe({
      next: (response) => {
        console.log(response);
        if (response.includes("correctly")) {
          this.toastr.success('Registrazione effettuata', 'Successo!');
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 4000);
        } else {
          this.toastr.error('Problemi nella registrazione', 'Cortesemente riprova.');
        }
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('Problemi nella registrazione', 'Cortesemente riprova.');
      }
    });
  } 
  
  passwordVisible: boolean = false;
  confirmPassword: string = '';
  passwordMismatch: boolean = false;

  togglePasswordVisibility(passwordInput: HTMLInputElement): void {
    this.passwordVisible = !this.passwordVisible;
    passwordInput.type = this.passwordVisible ? 'text' : 'password';
  }

  onConfirmPasswordChange(value: string): void {
    this.confirmPassword = value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    this.passwordMismatch = this.confirmPassword !== password;
  }

}
