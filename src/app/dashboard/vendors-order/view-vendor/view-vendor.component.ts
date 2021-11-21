import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { VendorOrderService } from '../vendor-order.service';

@Component({
  selector: 'ms-view-vendor',
  templateUrl: './view-vendor.component.html',
  styleUrls: ['./view-vendor.component.scss']
})
export class ViewVendorComponent implements OnInit {
id;
order;
orderId;
state;
vendorName;
vendorPhone;
clientName;
clientPhone;
price;
appAmount;
date;
vendorId
  constructor(private vendorService: VendorOrderService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.id = params.id
        this.spinner.show()
      this.vendorService.GetId(this.id).
      then( response => { this.order = response;
        console.log(this.order)
        setTimeout(() => {
          this.spinner.hide();
        }, this.order);
        this.orderId = this.order.orderId;
        this.state = this.order.state;
        this.vendorName = this.order.vendor.name;
        this.vendorPhone = this.order.vendor.user.phone;
        this.clientName = this.order.client.user.name;
        this.clientPhone = this.order.client.user.phone;
        this.price = this.order.price;
        this.appAmount = this.order.appAmount;
        this.date = this.order.date;
        this.vendorId = this.order.vendor._id
      });
    })
  }
  goTo(){
    this.router.navigate([`dashboard/addmechanical/` + this.vendorId])
  }
}
