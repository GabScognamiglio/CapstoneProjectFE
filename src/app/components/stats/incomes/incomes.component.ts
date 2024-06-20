import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/interfaces/auth-data';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.scss']
})
export class IncomesComponent {
  user!: AuthData | null
  incomes:any
  caricamento=true;

  constructor(private toastr: ToastrService, private router: Router, private transactionSrv: TransactionService, private authSrv: AuthService) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) => {
      this.user = user
    })

    this.transactionSrv.getIncomesByAccountId(this.user?.user.account.id).subscribe((data) => {
      this.incomes = data;
    })

    setTimeout(() => {
      this.caricamento = false
    }, 600);
  }

  filters = {
    category: '',
    date: '',
    minAmount: null,
    maxAmount: null
  };

  get filteredTransactions() {
    return this.incomes.filter((transaction:any) => {
      const matchesCategory = this.filters.category ? transaction.category.includes(this.filters.category) : true;
      const matchesDate = this.filters.date ? transaction.date === this.filters.date : true;
      const matchesMinAmount = this.filters.minAmount !== null ? transaction.amount >= this.filters.minAmount : true;
      const matchesMaxAmount = this.filters.maxAmount !== null ? transaction.amount <= this.filters.maxAmount : true;
      return matchesCategory && matchesDate && matchesMinAmount && matchesMaxAmount;
    });
  }

  setCategoryFilter(category: any) {
    this.filters.category = category;
  }

  get uniqueCategories() {
    return [...new Set(this.incomes.map((transaction:any) => transaction.category))];
  }

}
