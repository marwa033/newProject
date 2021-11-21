import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminsService } from '../admins.service';

@Component({
  selector: 'ms-add-admins',
  templateUrl: './add-admins.component.html',
  styleUrls: ['./add-admins.component.scss']
})
export class AddAdminsComponent implements OnInit {

  id;
  updateFlag: boolean = false;
  result: any;
  admin: any;
  email: any;
  role: any;
  name: any;
  phone: any;
  password: any;
  constructor(private adminService: AdminsService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id
      if(this.id != undefined){
        this.updateFlag = true
        this.spinner.show()
      }
      this.adminService.GetId(this.id).
      then( response => { this.admin = response;
        setTimeout(() => {
          this.spinner.hide();
        }, this.admin  );
        this.role = this.admin.role;
        this.name = this.admin.user.name;
        this.email = this.admin.user.email;
        this.phone = this.admin.user.phone;
        this.password = this.admin.user.password;
      });
    })
  }
  Add(value){
    this.spinner.show()
    if(this.updateFlag === false){
    this.adminService.Add(value).
       then( response => { this.result = response;
         });
    }else{
      this.adminService.Update(value,this.id).
      then( response => { this.result = response;
        });
        }           
        setTimeout(() => {
          this.spinner.hide();
        }, this.result);
  } 
}
