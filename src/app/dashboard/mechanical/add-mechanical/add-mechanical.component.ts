import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'app/dashboard/category/Category.service';
import { DistrictService } from 'app/dashboard/district/district.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { NgxSpinnerService } from 'ngx-spinner';
import { MechanicalService } from '../mechanical.service';

@Component({
  selector: 'ms-add-mechanical',
  templateUrl: './add-mechanical.component.html',
  styleUrls: ['./add-mechanical.component.scss']
})
export class AddMechanicalComponent implements OnInit {

  imageSrc;
  imgResultBeforeCompress;
  imgResultAfterCompress;
  coverResultAfterCompress: string;
  coverResultBeforeCompress: string;
  coverSrc;
  arname;
  enname;
  arBio;
  enBio;
  arAddress;
  enAddress;
  lat;
  lng;
  categories;
  districts;
  user;
  email;
  phone;
  password;
  selectedFeatures: any = [];  
  workingDays: boolean = false
  array: [];
  day;
  from;
  to;
  categoryId: any;
  parentId;
  subCategories: any;
  districtparentId
  subDistricts: any;
  id;
  updateFlag: boolean = false;
  result;
  workingHours: any=[];
  vendor: any;
  constructor(private imageCompress: NgxImageCompressService,
    private spinner: NgxSpinnerService,
    public districtService: DistrictService,
    public mechanicalService: MechanicalService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
    this.getDistricts();
    this.getSubCategories(this.parentId);
    this.getSubDistrict(this.districtparentId);
    
    this.route.params.subscribe(params => {
      this.id = params.id
      if(this.id != undefined){
        this.updateFlag = true
        this.spinner.show()
      }
      this.mechanicalService.GetId(this.id).
      then( response => { this.vendor = response;
        setTimeout(() => {
          this.spinner.hide();
        }, this.vendor);
        this.arname = this.vendor.name.ar;
        this.enname = this.vendor.name.en;
        this.arBio = this.vendor.bio.ar;
        this.enBio = this.vendor.bio.en;
        this.arAddress = this.vendor.address.ar;
        this.enAddress = this.vendor.address.en;
        this.imageSrc = this.vendor.image;
        this.coverSrc = this.vendor.cover;
        this.lat = this.vendor.lat;
        this.lng = this.vendor.lng;
        this.parentId = this.vendor.category.parentId;
        this.getSubCategories(this.parentId)
        this.categoryId = this.vendor.categoryId;
        this.districtparentId = this.vendor.districtId;
        this.user = this.vendor.user.name;
        this.phone = this.vendor.user.phone;
        this.password = this.vendor.user.password
        console.log(this.vendor.workingHours)
        this.vendor.workingHours.forEach(element => {
          this.workingDays = true
          this.workingHours.push({day:element.day , from:element.from, to:element.to})
        console.log(this.workingHours)
          if(element.day == 1){
            element.day = 'الاحد'
        }else if(element.day == 2){
          element.day = 'الاثنين'
        }else if(element.day == 3){
          element.day = 'الثلاثاء'
        }else if(element.day == 4){
          element.day = 'الاربع'
        }else if(element.day = 5){
          element.day = 'الخمبس'
        }else if(element.day = 6){
          element.day = 'الجمعة'
        }else if(element.day = 7){
          element.day = 'السبت'
        }
        this.selectedFeatures.push({day:element.day , from:element.from, to:element.to})
        console.log(this.selectedFeatures)
        });
      });
    })
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }
  
  getDistricts(){
    this.districtService.GetDistrict().
    then( response => { this.districts = response.data;
    });
} 
  getCategories(){
    let type = 'service'
    this.categoryService.GetCategories(type).
    then( responsedata => { 
      this.categories = responsedata.data;
    });
} 
 
getSubCategories(event){
  let type = 'service'
  let parent = event
  this.categoryService.GetSubCategories(type,parent).
  then( responsedata => { 
    this.subCategories = responsedata.data;
  });
} 

getSubDistrict(event){
  let parent = event
  this.districtService.GetSubDistrict(parent).
  then( responsedata => { 
    this.subDistricts = responsedata.data;
  });
} 
   
  onAdd() {
    this.workingHours.push({day:this.day , from:this.from , to:this.to});
    this.workingDays = true
    if(this.day == 1){
      this.day = 'الاحد'
    }else if(this.day == 2){
      this.day = 'الاثنين'
    }else if(this.day == 3){
      this.day = 'الثلاثاء'
    }else if(this.day == 4){
      this.day = 'الاربع'
    }else if(this.day = 5){
      this.day = 'الخمبس'
    }else if(this.day = 6){
      this.day = 'الجمعة'
    }else if(this.day = 7){
      this.day = 'السبت'
    }
    this.selectedFeatures.push({day:this.day , from:this.from , to:this.to});
    console.log(this.selectedFeatures)
    this.modalService.dismissAll(); 
    this.day = ''
    this.from = ''
    this.to = ''
  }
  removeTask(index) {
    this.selectedFeatures.splice(index, 1);
  }
  uploadFile(){
    this.imageCompress.uploadFile().then(({image, orientation}) => {
         this.imgResultBeforeCompress = image;
         this.imageCompress.compressFile(image, null, 60, 60).then(
           result => {
             this.imageSrc = result;
             this.imgResultAfterCompress = result;
           });
       });       
  }

  uploadCover(){
    this.imageCompress.uploadFile().then(({image, orientation}) => {
         this.coverResultBeforeCompress = image;
         this.imageCompress.compressFile(image, null, 60, 60).then(
           result => {
             this.coverSrc = result;
             this.coverResultAfterCompress = result;
           });
       });       
  }

  
  Add(value){
    this.spinner.show()
    if(this.updateFlag === false){
    this.mechanicalService.Add(value,this.workingHours).
       then( response => { this.result = response;
         });
    }else{
      this.mechanicalService.Update(value,this.id, this.workingHours).
      then( response => { this.result = response;
        });
        }           
        setTimeout(() => {
          this.spinner.hide();
        }, this.result);
  } 
}
