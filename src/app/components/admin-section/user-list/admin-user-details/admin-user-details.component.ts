import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-user-details',
  templateUrl: './admin-user-details.component.html',
  styleUrls: ['./admin-user-details.component.scss']
})
export class AdminUserDetailsComponent {
  user!: any;
  caricamento = true

  constructor(private adminSrv: AdminService, private toastr: ToastrService, private router: ActivatedRoute, private routerN: Router) { }



  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      const id = +params['id'];
      this.adminSrv.getUserById(id).subscribe((data:any) => {
        this.user = data
        console.log(this.user)
      });
    })

    setTimeout(() => {
      this.caricamento = false
    }, 600);
  }

}
