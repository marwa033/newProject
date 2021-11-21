import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxImageCompressService } from 'ngx-image-compress';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdsService } from '../ads.service';

@Component({
  selector: 'ms-add-ads',
  templateUrl: './add-ads.component.html',
  styleUrls: ['./add-ads.component.scss']
})
export class AddAdsComponent implements OnInit {
  imageSrc;
  imgResultBeforeCompress;
  imgResultAfterCompress;
  updateFlag: boolean = false;
  vendors: any;
  winches: any;
  typeDetect: any;
  mechanical: boolean = false;
  winch: boolean = false;
  id: any;
  result: any;
  ads: any;
  enddate: any;
  mechanicId: any;
  winchId: any;
  to: string;
  constructor(private imageCompress: NgxImageCompressService,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private adsService: AdsService ) { }
  uploadFile(){
    this.imageCompress.uploadFile().then(({image, orientation}) => {
         this.imgResultBeforeCompress = image;
         this.imageCompress.compressFile(image, null, 60, 60).then(
           result => {
             this.imageSrc = result;
             this.imgResultAfterCompress = result;
           }
         );
       });       
     }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id
      if(this.id != undefined){
        this.updateFlag = true
        this.spinner.show()
      }
      this.adsService.GetId(this.id).
      then( response => { this.ads = response;
        setTimeout(() => {
          this.spinner.hide();
        }, this.ads);
        this.enddate = this.ads.endDate;
        this.mechanicId = this.ads.vendorId;
        this.winchId = this.ads.winchId
        if(this.mechanicId != undefined){
          this.to = "mechanical"
          this.onChange(this.to)
        }else{
          this.to = "winch";
          this.onChange(this.to)
        }
      });
    })
  }
  GetVendor(){
    this.adsService.GetVendor().
    then( responsedata => { 
      this.vendors = responsedata.data;
    });
  }
  GetWinch(){
    this.adsService.GetWinch().
    then( responsedata => { 
      this.winches = responsedata.data;
    });
  }
  onChange(newValue) {
    if(newValue === "mechanical"){
      this.mechanical = true;
      this.winch = false;
      this.GetVendor()
    }else{
      this.winch = true;
      this.mechanical = false;
      this.GetWinch()
    }
  }
Add(value){
  this.spinner.show()
  if(this.updateFlag === false){
    if(value.imageSrc == "" || value.imageSrc == undefined){
      value.imageSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAF3CAMAAABkLEnOAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAMiaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBGRkQxRDNDOTFDNTExRTRCOUY3QzlGMTNGNzUwMjQ2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBGRkQxRDNEOTFDNTExRTRCOUY3QzlGMTNGNzUwMjQ2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEZGRDFEM0E5MUM1MTFFNEI5RjdDOUYxM0Y3NTAyNDYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MEZGRDFEM0I5MUM1MTFFNEI5RjdDOUYxM0Y3NTAyNDYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5+2M54AAAC2VBMVEVMaXG3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7fD4v+rAAAA8nRSTlMAAwECcNDABBAuBvAKDwx466Hkv4AtzPr+/AnjxPcUHlocgyrJV/YTwqjg6ssH7/QLHySqKTOFTPE8ZSdQmJ2iIUUmMHM1WX0gY8po8/gVugVI2OLnI6np11b73J5g5gj1vEDlxmnV+YJJ7rDU/a/TGb5Cis0SN73hRpMXZKyxEdqcXqvPL1PZWJveoD5Di844e8OkyOyujw6z8ii4mRhbfx1BhCJqrY4NstZ0t9vB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";
    }
  this.adsService.Add(value).
      then( response => { this.result = response;
       });
      }else{
        this.adsService.Update(value,this.id).
           then( response => { this.result = response;
             });
     }
     setTimeout(() => {
      this.spinner.hide();
    }, this.result);

} 
  }
