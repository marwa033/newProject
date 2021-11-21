import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductOrderService } from './product-order.service';

@Component({
  selector: 'ms-products-order',
  templateUrl: './products-order.component.html',
  styleUrls: ['./products-order.component.scss']
})
export class ProductsOrderComponent implements OnInit {
  dataSource: MatTableDataSource<unknown>;
  statusId;
  displayedColumns: string[] = ['count', 'orderId' , 'deliveryFees' , 'state' , 'district' ,  'createdAt', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  products: number;
  tries: any;
  arrivalDate: string;
  state: string;
  price: string;

  constructor(
    private porderService: ProductOrderService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private toastr : ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.GetProductOrder()
  }
  
  openLg(content) {
    this.modalService.open(content, { size: 'sm' });
  }
  openSm(cancel){
    this.modalService.open(cancel, { size: 'sm' });
  }
  stateRow(element){
    this.statusId = element._id
    // this.router.navigate([`dashboard/viewproduct/` + element._id])
  }
  Cancel(value){
    this.porderService.Cancel(value, this.statusId).
    then( responseAds => { this.tries = responseAds;
      this.GetProductOrder();
      this.modalService.dismissAll()
    })
  }
  Activation(value){
    this.porderService.Activation(value, this.statusId).
    then( responseAds => { this.tries = responseAds;
      this.GetProductOrder();
      this.modalService.dismissAll();
    this.arrivalDate = "";
    this.state = '';
    this.price = ''
    })
  }
  viewElemment(element){
    console.log(element)
    this.router.navigate([`dashboard/viewproduct/` + element._id])
  }
  GetProductOrder(){
    this.spinner.show()
    this.porderService.Get().
     then( response => { this.products = response.data;
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.paginator = this.paginator;
      setTimeout(() => {
     this.spinner.hide();
    }, this.products);
   })
  }

  addState(){
  }
}
