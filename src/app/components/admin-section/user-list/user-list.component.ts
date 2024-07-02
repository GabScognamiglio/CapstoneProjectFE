import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  users: any[] = [];
  page: number = 0;
  size: number = 10;
  sortBy: string = 'id';
  totalPages: number = 0;
  searchText: string = '';

  constructor(private adminSrv: AdminService) { }

  ngOnInit(): void {
    this.loadUsers();
    
  }

  loadUsers(): void {
    this.adminSrv.getUsers(this.page, this.size, this.sortBy).subscribe(data => {
      this.users = data.content;
      this.totalPages = data.totalPages;console.log(this.users)
    });
  }

  onPageChange(page: number): void {
    this.page = page;
    this.loadUsers();
  }

  filterUsers(): any[] {
    return this.users.filter(user =>
      user.firstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.lastName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.username.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.id.toString().includes(parseInt(this.searchText))
    );
  }
}

