import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  goalUrl = 'http://localhost:8080/api/gs-budgets/saving-goals';

  constructor(private http: HttpClient) { }


  getGoalsByAccountId(accountId:number){
    return this.http.get<any[]>(`${this.goalUrl}/user/${accountId}`)
  }

  getGoalById(id:number){
    return this.http.get(`${this.goalUrl}/${id}`)
  }

  saveGoal(goal:any){
    return this.http.post(this.goalUrl, goal, { responseType: 'text' as 'json' })
  }

  updateGoal(id: number, goal: any) {
    return this.http.put(`${this.goalUrl}/${id}`, goal)
  }

  increaseSavedAmount(savingGoalIdd: number, newSavedAmount: number) {
    const params = {
      newSavedAmount: newSavedAmount
    }
    return this.http.put(`${this.goalUrl}/${savingGoalIdd}/increase-saved-amount`, {params})
  }

  deleteGoal(id: number) {
    return this.http.delete(`${this.goalUrl}/${id}`, { responseType: 'text' as 'json' })
  }

}
