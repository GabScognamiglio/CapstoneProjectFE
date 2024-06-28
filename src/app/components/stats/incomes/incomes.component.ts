import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EChartsOption } from 'echarts';
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
  incomes: any[] = []
  caricamento = true;
  options!: EChartsOption;

  constructor(private toastr: ToastrService, private router: Router, private transactionSrv: TransactionService, private authSrv: AuthService) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) => {
      this.user = user
    })

    this.transactionSrv.getIncomesByAccountId(this.user?.user.account.id).subscribe((data) => {
      this.incomes = data;
      this.formatChartData();
    })

    setTimeout(() => {
      this.caricamento = false
    }, 600);
  }

  filters = {
    category: '',
    date: '',
    minAmount: null,
    maxAmount: null,
    futureDate: false,
    sortOrder: 'desc' // 'asc' per ordine crescente, 'desc' per ordine decrescente
  };

  get filteredTransactions() {
    return this.incomes
    .filter((transaction: any) => {
      const matchesCategory = this.filters.category ? transaction.category.includes(this.filters.category) : true;
      const matchesDate = this.filters.date ? transaction.date === this.filters.date : true;
      const matchesMinAmount = this.filters.minAmount !== null ? transaction.amount >= this.filters.minAmount : true;
      const matchesMaxAmount = this.filters.maxAmount !== null ? transaction.amount <= this.filters.maxAmount : true;
      const matchesFutureDate = this.filters.futureDate ? new Date(transaction.date) > new Date() : true;
      return matchesCategory && matchesDate && matchesMinAmount && matchesMaxAmount && matchesFutureDate;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return this.filters.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });;
  }

  setCategoryFilter(category: any) {
    this.filters.category = category;
  }
  setFutureDateFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.filters.futureDate = inputElement.checked;
  }

  get uniqueCategories() {
    return [...new Set(this.incomes.map((transaction: any) => transaction.category))];
  }

  getCategoryClass(category: any): string {
    switch (category) {
      case 'SPESA': return 'category-spesa';
      case 'SALUTE': return 'category-salute';
      case 'SVAGO': return 'category-svago';
      case 'RISTORANTI': return 'category-ristoranti';
      case 'ISTRUZIONE': return 'category-istruzione';
      case 'REGALI': return 'category-regali';
      case 'FAMIGLIA': return 'category-famiglia';
      case 'ATTIVITA_FISICA': return 'category-attivita-fisica';
      case 'TRASPORTI': return 'category-trasporti';
      case 'ABBONAMENTI': return 'category-abbonamenti';
      case 'AUTO': return 'category-auto';
      case 'OBIETTIVI': return 'category-obiettivi';
      case 'ALTRO': return 'category-altro';
      case 'STIPENDIO': return 'category-stipendio';
      case 'REGALO': return 'category-regalo';
      case 'VINCITA': return 'category-vincita';
      case 'INTERESSI': return 'category-interessi';
      default: return 'category-altro'; // Default class
    }
  }

  categoryColors: { [categoria: string]: string } = {
    'STIPENDIO': '#78e08f', 
    'REGALO': '#fa983a',
    'VINCITA': '#38ada9',
    'INTERESSI': '#6a89cc',
    'ALTRO': '#60a3bc'

  };

  formatChartData(): void {

    this.options = {
      labelLine: {
        show: false,
      },
      label: {
        formatter: "{b}",
        show: false
      },
      tooltip: {
        trigger: 'item',
        formatter: ' {b} - {c}€ ({d}%)',
      },
      series: [{
        name: 'Percentuali transazioni',
        type: 'pie',
        radius: ['50%', '70%'],
        data: this.incomes?.reduce((data, item) => {
          const existingCategory = data.find((c:any) => c.name === item.category);
          if (existingCategory) {
            existingCategory.value += item.amount;
          } else {
            data.push({
              name: item.category,
              value: item.amount,
              itemStyle: {
                color: this.categoryColors[item.category] || '#CCC' // Default color
              }
            });
          }
          return data;
        }, [])
      }]
    };
  }
  setSortOrder(event: Event) {
    const inputElement = event.target as HTMLSelectElement;
    this.filters.sortOrder = inputElement.value;
  }

}
