import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  // increaseSavedAmount(savingGoalIdd: number, newSavedAmountnum: number) {
  //   return this.http.put(`${this.goalUrl}/${savingGoalIdd}/increase-saved-amount`,
  //      {params:{newSavedAmount:newSavedAmountnum}})
  // }

  increaseSavedAmount(savingGoalId: number, newSavedAmount: number): Observable<any> {
    const url = `${this.goalUrl}/${savingGoalId}/increase-saved-amount?newSavedAmount=${newSavedAmount}`;
    return this.http.put<any>(url, {responseType : 'json'} )
  
  }



  deleteGoal(id: number) {
    return this.http.delete(`${this.goalUrl}/${id}`, { responseType: 'text' as 'json' })
  }

}
