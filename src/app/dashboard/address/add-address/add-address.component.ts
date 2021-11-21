import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DistrictService } from 'app/dashboard/district/district.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddressService } from '../address.service';

@Component({
  selector: 'ms-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {

  updateFlag: boolean = false;
  results;
  id;
  districts: any;
  subDistrict: any;
  address: any;
  title;
  street;
  building;
  floor;
  apartment;
  lat;
  lang;
  districtId;
  districtSubId;
  comment;


  constructor(private imageCompress: NgxImageCompressService,
              private route: ActivatedRoute,
              private districtService: DistrictService,
              private spinner: NgxSpinnerService,
              private addressService: AddressService ) { }

  ngOnInit() {
    this.getDistricts();
    this.route.params.subscribe(params => {
      this.id = params.id
      if(this.id != undefined){
        this.updateFlag = true
        this.spinner.show()
      }
      this.addressService.GetById(this.id).
      then( response => { this.address = response;
        setTimeout(() => {
          this.spinner.hide();
        }, this.address);
        this.title = this.address.title;
        this.street = this.address.street;
        this.floor = this.address.floor;
        this.building = this.address.building;
        this.apartment = this.address.apartment;
        this.lat = this.address.lat;
        this.lang = this.address.lng;
        this.districtId = this.address.district.parentId
        this.getSubDistrict(this.districtId)
        this.districtSubId = this.address.districtId;
      });
    })
  }
  
  getDistricts(){
    this.districtService.GetDistrict().
    then( response => { this.districts = response.data;
    });
} 
  getSubDistrict(parentId){
    this.districtService.GetSubDistrict(parentId).then(response => {this.subDistrict = response.data})
  }
Add(value){
  this.spinner.show()
  console.log(this.updateFlag)
  if(this.updateFlag === false){
  this.addressService.Add(value).
      then( response => { this.results = response;
       });
      }else{
        this.addressService.Update(value,this.id).
           then( response => { this.results = response;
             });
     }
     setTimeout(() => {
      this.spinner.hide();
    }, this.results);

} 
  }
