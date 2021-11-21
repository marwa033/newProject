import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SharedData } from 'app/Shared/sharedClass';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MechanicalService {
  token = JSON.parse(localStorage.getItem("headerToken"));
  result;
  district;
  active: any;
  getfilterDistrictResult: any;
  constructor(private toastr : ToastrService,
    private router: Router,) { }

  async Get() {
    const request = new Request(`${SharedData.BASE_URL}auth/vendors`,
    { method: 'GET',
    });
          request.headers.delete('Content-Type');
          request.headers.append('Content-Type', 'application/json');
         request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
          const response = await fetch( request);
    const responsedata = await response.json();
    this.result = responsedata;
    return this.result;
  }

  
  async GetId(id) {    
    const request = new Request(`${SharedData.BASE_URL}auth/vendors/`+id,
    { method: 'GET',
    });
          request.headers.delete('Content-Type');
          request.headers.append('Content-Type', 'application/json');
         request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
          const response = await fetch( request);
    const responsedata = await response.json();
    this.result = responsedata;
    return this.result;
  }

  async Add(value, selectedFeatures) {
    const data = {name:{ en: value.enname , ar: value.arname},
    bio:{en: value.enBio , ar: value.arBio},
    address:{en: value.enAddress, ar: value.arAddress},
    image: value.imageSrc, cover: value.coverSrc, lat: value.lat, lng: value.lng, 
    categoryId: value.categoryId, districtId: value.districtparentId,
    workingHours: selectedFeatures,
    user:{name: value.user, phone: value.phone, password: value.password}};  
    const bodyobj = JSON.stringify(data);
    const request = new Request(`${SharedData.BASE_URL}auth/vendors`, {
      method: 'POST',
      body: bodyobj
  });
  request.headers.delete('Content-Type');
  request.headers.append('Content-Type', 'application/json');
 request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
  
  const response = await fetch( request);
  const getAddDistrict = await response.json();
  let message = getAddDistrict.message;
  if (message) {
    this.toastr.error(message);
  
  }
   else{
    this.toastr.success('Successfully Added');
    this.router.navigate(['./dashboard/mechanical']);
  }
  this.district = getAddDistrict;
  return this.district
}
async Update(value, id , selectedFeatures) {
  const data = {name:{ en: value.enname , ar: value.arname},
  bio:{en: value.enBio , ar: value.arBio},
  address:{en: value.enAddress, ar: value.arAddress},
  image: value.imageSrc, cover: value.coverSrc, lat: value.lat, lng: value.lng, 
  categoryId: value.categoryId, districtId: value.districtparentId,
  workingHours: selectedFeatures, _id: id,
  user:{name: value.user, phone: value.phone, password: value.password}}; 
  const bodyobj = JSON.stringify(data);
  const request = new Request(`${SharedData.BASE_URL}auth/vendors`, {
    method: 'PUT',
    body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', this.token);

const response = await fetch( request);
const getAddDistrict = await response.json();
let message = getAddDistrict.message;
if (message) {
  this.toastr.error(message);

}
 else{
  this.toastr.success('Successfully Updated');
  this.router.navigate(['./dashboard/mechanical']);
}
this.district = getAddDistrict;
return this.district
}

async Activation(element) {
  const data = {_id:element.userId};
const bodyobj = JSON.stringify(data);
const request = new Request(`${SharedData.BASE_URL}auth/users/changeState`,
{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', this.token);
request.headers.append('lang', 'ar');
        const response = await fetch( request);
  const result = await response.json();
    this.toastr.info('Change State');
  this.active = result;
  return this.active;
}

async Filter(value) {
  if(value.name === ""){
    value.name = undefined
  }
  if(value.categoryId === ""){
    value.categoryId = undefined
  }
  if(value.districtId === ""){
    value.districtId = undefined
  }
  if(value.status === ""){
    value.status = undefined
  }
  if(value.name != undefined && value.districtId === undefined && value.status === undefined && value.categoryId === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}auth/vendors?name=`+ value.name,
    { method: 'GET',}
    )
  }else if(value.districtId != undefined && value.name === undefined && value.status === undefined && value.categoryId === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}auth/vendors?districtId=`+ value.districtId,
    { method: 'GET',}
    )
  }else if(value.status != undefined && value.name === undefined && value.districtId === undefined && value.categoryId === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}auth/vendors?state=`+ value.status,
    { method: 'GET',}
    )
  }else if(value.categoryId != undefined && value.name === undefined && value.districtId === undefined && value.status === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}auth/vendors?categoryId=`+ value.categoryId,
    { method: 'GET',}
    )
  }
  else if(value.status != undefined && value.name != undefined && value.districtId === undefined && value.categoryId === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}auth/vendors?state=`+ value.status + '&name=' + value.name,
    { method: 'GET',}
    )
  }else if(value.status != undefined && value.districtId != undefined && value.name === undefined&& value.categoryId === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}auth/vendors?state=`+ value.status + '&districtId=' + value.districtId,
    { method: 'GET',}
    )
  }else if(value.status != undefined && value.categoryId != undefined && value.name === undefined&& value.districtId === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}auth/vendors?state=`+ value.status + '&categoryId=' + value.categoryId,
    { method: 'GET',}
    )
  }else if(value.name != undefined && value.districtId != undefined && value.status === undefined && value.categoryId === undefined ){
    var endPoint = new Request(`${SharedData.BASE_URL}auth/vendors?name=`+ value.name + '&districtId=' + value.districtId,
    { method: 'GET',}
    )
  }else if(value.categoryId != undefined && value.districtId != undefined && value.status === undefined && value.name === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}auth/vendors?categoryId=`+ value.categoryId + '&districtId=' + value.districtId,
    { method: 'GET',}
    )
  }else if(value.categoryId != undefined && value.name != undefined && value.status === undefined && value.districtId === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}auth/vendors?categoryId=`+ value.categoryId + '&name=' + value.name,
    { method: 'GET',}
    )
  }else if(value.categoryId != undefined && value.name != undefined && value.status != undefined && value.districtId === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}auth/vendors?categoryId=`+ value.categoryId +
     '&name=' + value.name + '&state=' + value.status,
    { method: 'GET',}
    )
  }else if(value.categoryId != undefined && value.name != undefined && value.status != undefined && value.districtId === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}auth/vendors?categoryId=`+ value.categoryId +
     '&name=' + value.name + '&districtId=' + value.status,
    { method: 'GET',}
    )
  }else if(value.categoryId != undefined && value.status != undefined && value.districtId != undefined && value.name === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}auth/vendors?categoryId=`+ value.categoryId +
     '&name=' + value.name + '&state=' + value.status,
    { method: 'GET',}
    )
  }else if(value.status != undefined && value.name != undefined && value.districtId != undefined && value.categoryId === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}auth/vendors?districtId=`+ value.districtId +
     '&name=' + value.name + '&state=' + value.status,
    { method: 'GET',}
    )
  }
  else{
    var endPoint = new Request(`${SharedData.BASE_URL}auth/vendors?name=`+ value.name + '&parentId=' + value.districtId + 
    '&state=' + value.status,
    { method: 'GET',}
    )
  }
  const request = endPoint
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
       request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
        const response = await fetch( request);
  const responsedistrictfilter = await response.json();
  this.getfilterDistrictResult = responsedistrictfilter;
  return this.getfilterDistrictResult;
}
}
