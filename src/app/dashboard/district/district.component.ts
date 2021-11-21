import { Component, OnInit, ViewChild } from '@angular/core';
import { DistrictService } from './district.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ms-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class DistrictComponent implements OnInit {
  districts: any = [];
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['count', 'name'  ,  'createdAt', 'updatedAt', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  tries: any;
  districtsDropdwn: any;
  status: any;
  districtId: string;
  name: string;
 
  constructor(
    public districtService: DistrictService,
    private spinner: NgxSpinnerService,
    private toastr : ToastrService,
    private router: Router) {
    }

  ngOnInit(): void {
  this.Districts()
  }
  Districts(){
    this.spinner.show()
     this.districtService.GetDistrict().
              then( responsedistrictdata => { this.districts = responsedistrictdata.data;
                this.districtsDropdwn = responsedistrictdata.data
                 this.dataSource = new MatTableDataSource(responsedistrictdata.data);
                 this.dataSource.paginator = this.paginator;
                 setTimeout(() => {
                  this.spinner.hide();
                }, this.districts);
             }
             )
            }
  editRow(element) {
    let id = element._id
    this.router.navigate([`dashboard/adddistrict/` + id])
    }
    
  Active(element){
    this.districtService.districtActivation(element).
    then( responseAds => { this.tries = responseAds;
      this.Districts()
  });
}
  FilterDistrict(value){
    if(value.districtId != undefined || value.name != undefined || value.status != undefined){
    this.spinner.show()
      this.districtService.GetFilterDistrict(value).
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
   this.districtId = undefined;
   this.name = undefined;
   this.Districts()
 }
 subDistrict(element){
  this.spinner.show()
  this.districtService.GetSubDistrict(element._id).
           then( responsedistrictdata => { this.districts = responsedistrictdata.data;
             this.districtsDropdwn = responsedistrictdata.data
              this.dataSource = new MatTableDataSource(responsedistrictdata.data);
              this.dataSource.paginator = this.paginator;
              setTimeout(() => {
               this.spinner.hide();
             }, this.districts);
          }
          )
 }
}
