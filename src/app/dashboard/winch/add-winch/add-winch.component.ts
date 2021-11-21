import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxImageCompressService } from 'ngx-image-compress';
import { NgxSpinnerService } from 'ngx-spinner';
import { threadId } from 'worker_threads';
import { WinchService } from '../winch.service';

@Component({
  selector: 'ms-add-winch',
  templateUrl: './add-winch.component.html',
  styleUrls: ['./add-winch.component.scss']
})
export class AddWinchComponent implements OnInit {
  arname;
  enname;
  lat;
  lng;
  car;
  user;
  phone;
  email;
  password;
  id;
  updateFlag: boolean = false;
  results: any;
  winch: any;

  constructor(
    private imageCompress: NgxImageCompressService,
              private route: ActivatedRoute,
              private winchService: WinchService,
              private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.id = params.id
      if(this.id != undefined){
        this.updateFlag = true
        this.spinner.show()
      }
      this.winchService.GetId(this.id).
      then( response => { this.winch = response;
        setTimeout(() => {
          this.spinner.hide();
        }, this.winch);
        this.arname = this.winch.name.ar;
        this.enname = this.winch.name.en;
        this.car = this.winch.carNumber;
        this.lat = this.winch.lat;
        this.lng = this.winch.lng;
        this.user = this.winch.user.name;
        this.email = this.winch.user.email;
        this.password = this.winch.user.password;
        this.phone = this.winch.user.phone;
      });
    })
  }
  Add(value){
    this.spinner.show()
    console.log(this.updateFlag)
    if(this.updateFlag === false){
    this.winchService.Add(value).
        then( response => { this.results = response;
         });
        }else{
          this.winchService.Update(value,this.id).
             then( response => { this.results = response;
               });
       }
       setTimeout(() => {
        this.spinner.hide();
      }, this.results);
  
  } 
}
