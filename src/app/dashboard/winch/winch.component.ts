import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { WinchService } from './winch.service';

@Component({
  selector: 'ms-winch',
  templateUrl: './winch.component.html',
  styleUrls: ['./winch.component.scss']
})
export class WinchComponent implements OnInit {
  districts;
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['count', 'name', 'number', 'createdAt', 'updatedAt', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  tries: any;
  districtsDropdwn: any;
  status: any;
  districtId: string;
  name: string;
  winches: any;
 
  constructor(
    public winchSerrvice: WinchService,
    private spinner: NgxSpinnerService,
    private toastr : ToastrService,
    private router: Router) {
    }

  ngOnInit(): void {
  this.Winches()
  }
  Winches(){
    this.spinner.show()
     this.winchSerrvice.Get().
              then( responsedistrictdata => { this.winches = responsedistrictdata.data;
                 this.dataSource = new MatTableDataSource(responsedistrictdata.data);
                 this.dataSource.paginator = this.paginator;
                 setTimeout(() => {
                  this.spinner.hide();
                }, this.winches);
             }
             )
            }
  editRow(element) {
    let id = element._id
    this.router.navigate([`dashboard/addwinch/` + id])
    }
    
  Active(element){
    this.winchSerrvice.Activation(element).
    then( responseAds => { this.tries = responseAds;
      this.Winches()
  });
}
  Filter(value){
    if(value.status != undefined){
    this.spinner.show()
      this.winchSerrvice.GetFilter(value).
      then( responsedistrictfilter => { this.districts = responsedistrictfilter.data;
         this.dataSource = new MatTableDataSource(responsedistrictfilter.data);
         this.dataSource.paginator = this.paginator;
         setTimeout(() => {
          this.spinner.hide();
        }, this.districts);
      });
    }else{
      this.toastr.error("nothing to search for")
    }
 }
 action(){
   this.status = undefined;
   this.Winches()
 }
}
