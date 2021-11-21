import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { VendorOrderService } from './vendor-order.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ms-vendors-order',
  templateUrl: './vendors-order.component.html',
  styleUrls: ['./vendors-order.component.scss']
})
export class VendorsOrderComponent implements OnInit {

  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['count', 'orderId', 'name' , 'price', 'appAmount' , 'state' , 'createdAt','action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  vendors: number;
  tries: any;
  statusId: any;
  vendorId: any;
  description: string;
  date;
  state;
  name;

  constructor(
    private vorderService: VendorOrderService,
    private spinner: NgxSpinnerService,
    private toastr : ToastrService,
    private modalService: NgbModal,
    private router: Router) { }
    
    Filter(value){
      console.log(value)
      
    value.date = new DatePipe('en-Us').transform(this.date, 'MM-dd-yyyy');
      if(value.date != undefined || value.name != undefined || value.state != undefined){
        this.spinner.show()
          this.vorderService.GetFilter(value).
          then( response => { this.vendors = response.data;
             this.dataSource = new MatTableDataSource(response.data);
             this.dataSource.paginator = this.paginator;
             setTimeout(() => {
              this.spinner.hide();
            }, this.vendors);
          });
        }else{
          this.toastr.error("nothing to search for")
        }
    }
    ngOnInit() {
      this.GetVendorOrder()
    }
    GetVendorOrder(){
      this.spinner.show()
      this.vorderService.Get().
       then( response => { this.vendors = response.data;
        this.dataSource = new MatTableDataSource(response.data);
        this.dataSource.paginator = this.paginator;
        setTimeout(() => {
       this.spinner.hide();
      }, this.vendors);
     })
    }
    Activation(value){
      this.vorderService.Activation(value, this.statusId).
      then( responseAds => { this.tries = responseAds;
        this.GetVendorOrder();
        this.modalService.dismissAll()
    });
    }
    stateElement(element){
      console.log(element)
      this.vendorId = element._id
    }
  Cancel(value){
    this.vorderService.Cancel(value, this.vendorId).
    then( responseAds => { this.tries = responseAds;
      this.GetVendorOrder();
      this.modalService.dismissAll();
      this.description = ''
    })
  }
  openSm(cancel){
    this.modalService.open(cancel, { size: 'sm' });
  }
    openLg(content) {
      this.modalService.open(content, { size: 'sm' });
    }
    stateRow(element){
      console.log(element)
      this.statusId = element._id;
      this.router.navigate([`dashboard/viewVendor/` + element._id])
    }

    action(){
      this.state = undefined;
      this.date = undefined;
      this.name = undefined;
      this.GetVendorOrder()
    }
}
