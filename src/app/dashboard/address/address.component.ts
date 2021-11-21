import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DistrictService } from '../district/district.service';
import { AddressService } from './address.service';

@Component({
  selector: 'ms-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  districts;
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['count', 'title' , 'street' , 'district' ,  'createdAt', 'updatedAt', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  tries: any;
  districtsDropdwn: any;
  status: any;
  districtId: string;
  name: string;
  addresses: any;
 
  constructor(
    public districtService: DistrictService,
    private addressService: AddressService,
    private spinner: NgxSpinnerService,
    private toastr : ToastrService,
    private router: Router) {
    }

  ngOnInit(): void {
  this.Address()
  }
  Address(){
    this.spinner.show()
     this.addressService.GetAddress().
              then( responsedistrictdata => { this.addresses = responsedistrictdata.data;
                 this.dataSource = new MatTableDataSource(responsedistrictdata.data);
                 this.dataSource.paginator = this.paginator;
                 setTimeout(() => {
                  this.spinner.hide();
                }, this.addresses);
             }
             )
            }
  editRow(element) {
    let id = element._id
    this.router.navigate([`dashboard/addaddress/` + id])
    }
    
  Active(element){
    this.addressService.Activation(element).
    then( responseAds => { this.tries = responseAds;
      this.Address()
  });
}

}
