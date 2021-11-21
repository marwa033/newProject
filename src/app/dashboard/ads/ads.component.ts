import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { CategoryService } from '@syncfusion/ej2-angular-charts';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdsService } from './ads.service';

@Component({
  selector: 'ms-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit {
  products;
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['count', 'image' , 'mechanic' , 'winch' ,'endDate', 'createdAt', 'updatedAt', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  tries: any;
  districtsDropdwn: any;
  categories: any;
  name: string;
  categoryId: string;
  status: string;
 
  constructor(
    public adsService: AdsService,
    private toastr : ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router) {
    }

  ngOnInit(): void {
  this.Ads()
}
  Ads(){
    this.spinner.show()
     this.adsService.Get().
              then( responsedistrictdata => { this.products = responsedistrictdata.data;
                 this.dataSource = new MatTableDataSource(responsedistrictdata.data);
                 this.dataSource.paginator = this.paginator;
                 setTimeout(() => {
                  this.spinner.hide();
                }, this.products);
             }
             )
            }
  editRow(element) {
    let id = element._id
    this.router.navigate([`dashboard/addads/` + id])
    }
    
  Active(element){
    this.spinner.show()
    this.adsService.Activation(element).
    then( responseAds => { this.tries = responseAds;
      this.Ads()
     });
}
deleteRow(element){
  this.spinner.show()
  this.adsService.Delete(element).
  then( responseAds => { this.tries = responseAds;
    this.Ads()
   });
}
  Filter(value){
    if(this.status != undefined){
    this.spinner.show()
      this.adsService.GetFilter(value).
      then( responsedistrictfilter => { this.products = responsedistrictfilter.data;
         this.dataSource = new MatTableDataSource(responsedistrictfilter.data);
         this.dataSource.paginator = this.paginator;
         setTimeout(() => {
          this.spinner.hide();
        }, this.products);
      });
    }else{
      this.toastr.error("nothing to search for")
    }

 }
 action(){
   this.status = undefined;
   this.Ads()
 }
}
