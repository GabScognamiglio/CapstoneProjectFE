import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/interfaces/auth-data';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {

  user!: AuthData | null

  constructor(private authSrv: AuthService, private router: Router, private toastr: ToastrService, private userSrv: UserService) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) => {
      this.user = user
    })
  }

  modUtente(form: NgForm) {

    let userMod = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      dateOfBirth: form.value.dateOfBirth,
      phoneNumber: form.value.phoneNumber,
      password: form.value.password
    }
    console.log(userMod)
    this.userSrv.modificaUtente(this.user?.user.id, userMod).subscribe({
      next: () => {
        if (this.user) {
          this.user.user.firstName = userMod.firstName;
          this.user.user.lastName = userMod.lastName;
          this.user.user.email = userMod.email;
          this.user.user.dateOfBirth = userMod.dateOfBirth;
          this.user.user.phoneNumber = userMod.phoneNumber;
        }
        this.toastr.success('Dati utente modificati correttamente'); this.router.navigate(['/profile-settings/details']);
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('Problemi nella modifica dei dati, riprova.');
      }
    })
  }
}
