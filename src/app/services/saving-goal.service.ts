import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SavingGoalService {
  savingGoalUrl = 'http://localhost:8080/api/gs-budgets/saving-goals'

  constructor(private http: HttpClient) { }

  getSavingGoalsByUserId(userId: number) {
    return this.http.get(`${this.savingGoalUrl}/user/${userId}`)
  }

  getSavingGoalById(id: number) {
    return this.http.get(`${this.savingGoalUrl}/${id}`)
  }

  saveSavingGoal(savingGoal: any) {
    return this.http.post(this.savingGoalUrl, savingGoal)
  }

  //AGGIORNA L'OBIETTIVO E CREA UNA SPESA
  updateSavingGoal(id: number, newSavedAmount:number) {
    return this.http.put(`${this.savingGoalUrl}/${id}/increse-saved-amount`, {newSavedAmount})
  }

  deleteSavingGoal(id:number) {
    return this.http.delete(`${this.savingGoalUrl}/${id}`)
  }

}
