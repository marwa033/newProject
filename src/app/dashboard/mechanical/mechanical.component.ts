import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../category/Category.service';
import { DistrictService } from '../district/district.service';
import { MechanicalService } from './mechanical.service';

@Component({
  selector: 'ms-mechanical',
  templateUrl: './mechanical.component.html',
  styleUrls: ['./mechanical.component.scss']
})
export class MechanicalComponent implements OnInit {
  districts;
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['count', 'image' ,'name' ,  'createdAt', 'updatedAt', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  tries: any;
  districtsDropdwn: any;
  status: any;
  districtId: string;
  name: string;
  mechanical: any;
  categories: any;
  categoryId;
 
  constructor(
    public mechanicalService: MechanicalService,
    public categoryService: CategoryService,
    public districtService: DistrictService,
    private spinner: NgxSpinnerService,
    private toastr : ToastrService,
    private router: Router) {
    }

  ngOnInit(): void {
  this.Mechanical();
  this.Districts();
  this.Category();
  }
  Mechanical(){
    this.spinner.show()
     this.mechanicalService.Get().
              then( responsedistrictdata => { this.mechanical = responsedistrictdata.data;
                 this.dataSource = new MatTableDataSource(responsedistrictdata.data);
                 this.dataSource.paginator = this.paginator;
                 setTimeout(() => {
                  this.spinner.hide();
                }, this.mechanical);
             }
             )
            }
  editRow(element) {
    let id = element._id
    this.router.navigate([`dashboard/addmechanical/` + id])
    }
    
  Category(){
    let type = "products"
    this.spinner.show()
     this.categoryService.GetCategories(type).
              then( responsedistrictdata => { this.categories = responsedistrictdata.data;
             }
             )
    }
    
  Districts(){
     this.districtService.GetDistrict().
      then( responsedistrictdata => { ;
        this.districtsDropdwn = responsedistrictdata.data
    }
    )
  }
    
  Active(element){
    this.mechanicalService.Activation(element).
    then( responseAds => { this.tries = responseAds;
      this.Mechanical()
  });
}
  Filter(value){
    console.log('0')
    if(value.districtId != undefined || value.name != undefined || value.status != undefined || value.categoryId != undefined){
    this.spinner.show()
      this.mechanicalService.Filter(value).
      then( responsedistrictfilter => { this.mechanical = responsedistrictfilter.data;
         this.dataSource = new MatTableDataSource(responsedistrictfilter.data);
         this.dataSource.paginator = this.paginator;
         setTimeout(() => {
          this.spinner.hide();
        }, this.mechanical);
      });
    }else{
      this.toastr.error("nothing to search for")
    }
 }
 action(){
   this.status = undefined;
   this.districtId = undefined;
   this.name = undefined;
   this.categoryId = undefined;
   this.Mechanical()
 }
}
