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

  constructor(private authSrv: AuthService, private router: Router, private toastr: ToastrService) {}

  // onSubmit(form: NgForm) {
  //   console.log(form.value);
  //   this.authSrv.signup(form.value).subscribe(
  //     (response) => {
  //       // alert("Registrazione effettuata")
  //       console.log(response);
  //       if (response.includes("correctly")) {
  //         this.toastr.success('Registrazione effettuata', 'Successo!');
  //       }
  //       setTimeout(() => {
  //         this.router.navigate(['/login']);
  //       }, 1000);
       
  //     },
  //     (error) => {
  //       console.error(error);
  //       this.toastr.error('Problemi nella registrazione', 'Cortesemente riprova.')
  //     }
  //   );
  // }

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
}
