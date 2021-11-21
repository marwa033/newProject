import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminsService } from './admins.service';

@Component({
  selector: 'ms-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {
  
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['count', 'name' , 'role'  ,  'createdAt', 'updatedAt', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  tries: any;
  status: any;
  admins;
  name: string;
  role = JSON.parse(localStorage.getItem("adminRole"));
 
  constructor(
    public adminService: AdminsService,
    private spinner: NgxSpinnerService,
    private toastr : ToastrService,
    private router: Router) {
    }

  ngOnInit(): void {
  this.Admins()
  }
  Admins(){
    this.spinner.show()
     this.adminService.Get().
              then( responsedistrictdata => { this.admins = responsedistrictdata.data;
                 this.dataSource = new MatTableDataSource(responsedistrictdata.data);
                 this.dataSource.paginator = this.paginator;
                 setTimeout(() => {
                  this.spinner.hide();
                }, this.admins);
             }
             )
            }
  editRow(element) {
    let id = element._id
    this.router.navigate([`dashboard/addadmin/` + id])
    }
    Active(element){
      this.spinner.show()
      this.adminService.Activation(element).
      then( responseAds => { this.tries = responseAds;
        this.Admins()
       });
    }
    delete(element){
      var yes = confirm("Are you sure you want to delete?");
      if(yes === true){
        this.adminService.Delete(element).
        then( responseAds => { this.tries = responseAds;
          this.Admins()
        });
      }else{

      }
}
Filter(value){}
}
