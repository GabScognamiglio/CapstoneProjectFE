import { Component } from '@angular/core';
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
  goals:any[]=[] 

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
              console.log(this.goals)
            }
          );
        }
      });
    }
}
