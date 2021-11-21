import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { WinchOrderService } from './winch-order.service';

@Component({
  selector: 'ms-winches-order',
  templateUrl: './winches-order.component.html',
  styleUrls: ['./winches-order.component.scss']
})
export class WinchesOrderComponent implements OnInit {

  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['count', 'orderId' , 'deliveryFees' , 'state' , 'winch' ,  'createdAt', 'updatedAt', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  products: number;
  winchId;
  description;
  tries;
  constructor(
    private worderService: WinchOrderService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private toastr : ToastrService,
    private router: Router) { }

    ngOnInit() {
      this.GetWinchOrder()
    }
    GetWinchOrder(){
      this.spinner.show()
      this.worderService.Get().
       then( response => { this.products = response.data;
        this.dataSource = new MatTableDataSource(response.data);
        this.dataSource.paginator = this.paginator;
        setTimeout(() => {
       this.spinner.hide();
      }, this.products);
     })
    }
    
  Cancel(value){
    this.worderService.Cancel(value, this.winchId).
    then( responseAds => { this.tries = responseAds;
      this.GetWinchOrder();
      this.modalService.dismissAll();
      this.description = ''
    })
  }
  openSm(cancel){
    this.modalService.open(cancel, { size: 'sm' });
  }
    stateElement(element){
      console.log(element)
      this.winchId = element._id
    }

    stateRow(element){
      console.log(element)
      this.winchId = element._id;
      this.router.navigate([`dashboard/viewwinch/` + element._id])
    }
}
