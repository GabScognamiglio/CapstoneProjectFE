import { SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/interfaces/auth-data';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrls: ['./goal-details.component.scss']
})
export class GoalDetailsComponent implements OnInit {
  @Input() goal: any;
  progressPercentage!:number
  stringProgressPercentage!:string

  user!: AuthData | null
  expenses: any[] = []
  goalExpenses: any[] = []

  constructor(private transactionSrv: TransactionService, private authSrv: AuthService){}

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) => {
      this.user = user}
    )

    this.transactionSrv.getExpensesByAccountId(this.user?.user.account.id).subscribe((data) => {
      this.expenses = data;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['goal'] && this.goal) {
      this.calculateProgress();
      
      this.goalExpenses=this.expenses.filter(e=> e.comment.includes("goalID:" + this.goal.id));
    
    }
  }

  calculateProgress(): void {
    if (this.goal && this.goal.targetAmount && this.goal.savedAmount !== undefined) {
      this.progressPercentage = Math.round((100 / this.goal.targetAmount) * this.goal.savedAmount);
      this.stringProgressPercentage = this.progressPercentage.toString()
      
    }
  }
  
}
