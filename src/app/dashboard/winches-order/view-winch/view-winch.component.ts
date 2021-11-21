import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VendorOrderService } from 'app/dashboard/vendors-order/vendor-order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { WinchOrderService } from '../winch-order.service';

@Component({
  selector: 'ms-view-winch',
  templateUrl: './view-winch.component.html',
  styleUrls: ['./view-winch.component.scss']
})
export class ViewWinchComponent implements OnInit {
  id;
  order;
  orderId;
  state;
  winchName;
  carNumber;
  clientName;
  clientPhone;
  price;
  deliveryFees;
  date;
  cancel;
  clientEmail;
  
  constructor(private winchService: WinchOrderService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id
        this.spinner.show()
      this.winchService.GetId(this.id).
      then( response => { this.order = response;
        console.log(this.order)
        setTimeout(() => {
          this.spinner.hide();
        }, this.order);
        this.orderId = this.order.orderId;
        this.state = this.order.state;
        this.winchName = this.order.winch.name;
        this.carNumber = this.order.winch.carNumber;
        this.carNumber = this.order.winch.carNumber;
        this.deliveryFees = this.order.deliveryFees;
        this.price = this.order.price;
        this.cancel = this.order.cancelReason;
        this.date= this.order.date;
        this.clientName = this.order.client.user.name;
        this.clientPhone = this.order.client.user.phone;
        this.clientEmail = this.order.client.user.email;
      });
    })
  }

}
