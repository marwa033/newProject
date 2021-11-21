import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductOrderService } from '../product-order.service';

@Component({
  selector: 'ms-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {
id;
order;
orderId;
state;
price;
date;
description;
cancelReason;
arrivedAt;
clientName;
clientPhone;
  constructor(private productService: ProductOrderService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.id = params.id
        this.spinner.show()
      this.productService.GetId(this.id).
      then( response => { this.order = response;
        console.log(this.order)
        setTimeout(() => {
          this.spinner.hide();
        }, this.order);
        this.orderId = this.order.orderId;
        this.state = this.order.state;
        this.price = this.order.price;
        this.clientName = this.order.client.user.name;
        this.clientPhone = this.order.client.user.phone;
        this.date = this.order.date;
        this.description =  this.order.description;
        this.cancelReason = this.order.cancelReason;
        this.arrivedAt = this.order.arrivedAt 
      });
    })
  }

}
