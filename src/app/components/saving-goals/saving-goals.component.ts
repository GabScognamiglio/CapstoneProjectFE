import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/interfaces/auth-data';
import { GoalsService } from 'src/app/services/goals.service';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-saving-goals',
  templateUrl: './saving-goals.component.html',
  styleUrls: ['./saving-goals.component.scss']
})
export class SavingGoalsComponent {
  user!: AuthData | null;
  goals: any[] = [];
  selectedGoal: any;

  constructor(private goalSrv: GoalsService,
    private authSrv: AuthService,
    private toastr: ToastrService,
    private router: Router) { }


  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) => {
      this.user = user;
      if (user) {
        //altre get da provare qui sotto
        this.goalSrv.getGoalsByAccountId(user.user.account.id).subscribe(
          (data) => {
            this.goals = data;
          }
        );
      }
    });
  }

  selectGoal(goal: any) {
    this.selectedGoal = goal;
  }

  deleteGoal(id:number){
    this.goalSrv.deleteGoal(id).subscribe({
      next: () => {
        this.toastr.success('Obiettivo eliminato con successo!');
        setTimeout(() => {
          window.location.reload();
        }, 1800);
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('Problemi nell\'eliminazione dell\'obiettivo, riprova.');
      }
    })
  }

  modificaGoal(id:number, form:NgForm){
    console.log(typeof(form.value.newSavedAmount))
    this.goalSrv.increaseSavedAmount(id, form.value.newSavedAmount).subscribe({
      next: () => {
        this.toastr.success('Obiettivo aggiornato con successo!');
        setTimeout(() => {
          window.location.reload();
        }, 600);
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('Problemi nell\'aggiornamento dell\'obiettivo, riprova.');
      }
    })
  }
}
