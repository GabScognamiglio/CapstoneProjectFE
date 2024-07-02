import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/interfaces/auth-data';
import { GoalsService } from 'src/app/services/goals.service';

@Component({
  selector: 'app-new-goal',
  templateUrl: './new-goal.component.html',
  styleUrls: ['./new-goal.component.scss']
})
export class NewGoalComponent {

  user!: AuthData | null;

  constructor(private goalSrv: GoalsService,
    private authSrv: AuthService,
    private toastr: ToastrService,
    private router: Router) {
     }


  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) => {
      this.user = user;
    })
  }

  createGoal(form:NgForm){
    console.log(form.value)
    this.goalSrv.saveGoal(form.value).subscribe({
      next: () => {
        this.toastr.success('Obiettivo di risparmio creato correttamente'); 
        setTimeout(() => {
         window.location.href="/saving-goals"
        }, 1800);

      },
      error: (error) => {
        console.error(error);
        this.toastr.error('Problemi nella creazione della transazione, riprova.');
      }
    })
  }
}
