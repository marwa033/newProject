import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DistrictService } from '../district.service';

@Component({
  selector: 'ms-adddistrict',
  templateUrl: './adddistrict.component.html',
  styleUrls: ['./adddistrict.component.scss']
})
export class AdddistrictComponent implements OnInit {

  districtId;
  enname;
  arname;
  districts;
  district;
  districtresult;
  id;
  updateFlag: boolean = false;
  constructor(private districtService: DistrictService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getDistricts();
    this.route.params.subscribe(params => {
      this.id = params.id
      if(this.id != undefined){
        this.updateFlag = true
        this.spinner.show()
      }
      this.districtService.GetDistrictId(this.id).
      then( response => { this.district = response;
        setTimeout(() => {
          this.spinner.hide();
        }, this.district  );
        this.enname = this.district.name.en;
        this.arname = this.district.name.ar;
        this.districtId = this.district.parentId
      });
    })
  }
  Add(value){
    this.spinner.show()
    if(this.updateFlag === false){
    this.districtService.Add(value).
       then( response => { this.districtresult = response;
         });
    }else{
      this.districtService.Update(value,this.id).
      then( response => { this.districtresult = response;
        });
        }           
        setTimeout(() => {
          this.spinner.hide();
        }, this.districtresult);
  } 
  getDistricts(){
    this.districtService.GetDistrict().
    then( response => { this.districts = response.data;
      console.log(this.districts)
    });
} 
}
