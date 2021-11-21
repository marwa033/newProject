import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from '../address/address.service';
import { DistrictService } from '../district/district.service';
import { PromocodesService } from './promocodes.service';

@Component({
  selector: 'ms-promocodes',
  templateUrl: './promocodes.component.html',
  styleUrls: ['./promocodes.component.scss']
})
export class PromocodesComponent implements OnInit {
  districts;
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['count', 'code','for' ,'daysPeriod','createdAt', 'updatedAt', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  tries: any;
  districtsDropdwn: any;
  status: any;
  districtId: string;
  name: string;
  addresses: any;
  results: any;
 
  constructor(
    public districtService: DistrictService,
    private promoService: PromocodesService,
    private spinner: NgxSpinnerService,
    private toastr : ToastrService,
    private router: Router) {
    }

  ngOnInit(): void {
  this.Promo()
  }
  Promo(){
    this.spinner.show()
     this.promoService.GetPromo().
              then( responsedistrictdata => { this.results = responsedistrictdata.data;
                 this.dataSource = new MatTableDataSource(responsedistrictdata.data);
                 this.dataSource.paginator = this.paginator;
                 setTimeout(() => {
                  this.spinner.hide();
                }, this.results);
             }
             )
            }
  editRow(element) {
    let id = element._id
    this.router.navigate([`dashboard/addpromo/` + id])
    }
    
  Active(element){
    this.promoService.Activation(element).
    then( responseAds => { this.tries = responseAds;
      this.Promo()
  });
}

}
