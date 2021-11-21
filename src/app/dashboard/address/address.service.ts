import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SharedData } from 'app/Shared/sharedClass';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  token = JSON.parse(localStorage.getItem("headerToken"));
  districtresult;
  address;
  active: any;
  getfilterDistrictResult: any;
  getId: any;
  results: any;
  constructor(private toastr : ToastrService,
    private router: Router,) { }


    async Add(value) {
      console.log(value.districtId)
      const data = {title: value.title,
        street: value.street, building: value.building, floor: value.floor, apartment:value.apartment,
        comment: value.comment, lat: value.lat, lng:value.lang, districtId: value.districtSubId};  
      const bodyobj = JSON.stringify(data);
      const request = new Request(`${SharedData.BASE_URL}components/addresses`, {
        method: 'POST',
        body: bodyobj
    });
    request.headers.delete('Content-Type');
    request.headers.append('Content-Type', 'application/json');
   request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
    
    const response = await fetch( request);
    const getAddAddress = await response.json();
    let message = getAddAddress.message;
    if (message) {
      this.toastr.error(message);
    
    }
     else{
      this.toastr.success('Successfully Added');
      this.router.navigate(['./dashboard/address']);
    }
    this.address = getAddAddress;
    return this.address
  }

  
  async Update(value, id) {
    console.log(value.districtId)
    const data = {title: value.title,
      street: value.street, building: value.building, floor: value.floor, apartment:value.apartment,
      comment: value.comment, lat: value.lat, lng:value.lang, districtId: value.districtSubId,
    _id: id};  
    const bodyobj = JSON.stringify(data);
    const request = new Request(`${SharedData.BASE_URL}components/addresses`, {
      method: 'PUT',
      body: bodyobj
  });
  request.headers.delete('Content-Type');
  request.headers.append('Content-Type', 'application/json');
 request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
  
  const response = await fetch( request);
  const getAddAddress = await response.json();
  let message = getAddAddress.message;
  if (message) {
    this.toastr.error(message);
  
  }
   else{
    this.toastr.success('Successfully Updated');
    this.router.navigate(['./dashboard/address']);
  }
  this.address = getAddAddress;
  return this.address
}

async GetById(id) {
    
  const request = new Request(`${SharedData.BASE_URL}components/addresses/`+id,
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
       request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
        const response = await fetch( request);
  const responsedata = await response.json();
  this.getId = responsedata;
  return this.getId;
}
async Activation(element) {
  const data = {_id:element._id};
const bodyobj = JSON.stringify(data);
const request = new Request(`${SharedData.BASE_URL}components/addresses/changeState`,
{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', this.token);
// console.log(log);
        const response = await fetch( request);
  const result = await response.json();
    this.toastr.info('Change State');
    // this.router.navigate(['/dashboard/showads']);
  this.active = result;
  return this.active;
}

async GetAddress() {
  const request = new Request(`${SharedData.BASE_URL}components/addresses`,
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
       request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
        const response = await fetch( request);
  const responsedata = await response.json();
  this.results = responsedata;
  return this.results;
}
}
