import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SharedData } from 'app/Shared/sharedClass';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdsService {
  token = JSON.parse(localStorage.getItem("headerToken"));
  results;
  active: any;
  add: any;
  getResult: any;
  idResult: any;
  getfilterResult: any;
  delete: any;
  constructor(private toastr : ToastrService,
    private router: Router,) { }

  async GetVendor() {
    const request = new Request(`${SharedData.BASE_URL}auth/vendors`,
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

  
  async GetWinch() {
    const request = new Request(`${SharedData.BASE_URL}auth/winches`,
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
  async Add(value) {    
      
    const data = {image:value.imageSrc,
      endDate: value.enddate,
      vendorId: value.mechanicId, winchId: value.winchId};

    const bodyobj = JSON.stringify(data);
    const request = new Request(`${SharedData.BASE_URL}components/ads`, {
      method: 'POST',
      body: bodyobj
  });
  request.headers.delete('Content-Type');
  request.headers.append('Content-Type', 'application/json');
 request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
  
  const response = await fetch( request);
  const getAddProduct = await response.json();
  let message = getAddProduct.message;
  if (message) {
    this.toastr.error(message);
  
  }
   else{
    this.toastr.success('Successfully Added');
    this.router.navigate(['/dashboard/ads']);
  }
  this.add = getAddProduct;
  return this.add
}
async GetId(id) {    
  const request = new Request(`${SharedData.BASE_URL}components/ads/`+id,
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
       request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
        const response = await fetch( request);
  const responsedata = await response.json();
  this.idResult = responsedata;
  return this.idResult;
}

async Get() {
  const request = new Request(`${SharedData.BASE_URL}components/ads`,
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
       request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
        const response = await fetch( request);
  const responsedata = await response.json();
  this.getResult = responsedata;
  return this.getResult;
}
async Update(value, id) {    
      
  const data = {image:value.imageSrc,
    endDate: value.enddate,
    _id: id,
    vendorId: value.mechanicId, winchId: value.winchId};

  const bodyobj = JSON.stringify(data);
  const request = new Request(`${SharedData.BASE_URL}components/ads`, {
    method: 'PUT',
    body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', this.token);
          request.headers.append('lang', 'ar');

const response = await fetch( request);
const getAddProduct = await response.json();
let message = getAddProduct.message;
if (message) {
  this.toastr.error(message);

}
 else{
  this.toastr.success('Successfully Updated');
  this.router.navigate(['/dashboard/ads']);
}
this.add = getAddProduct;
return this.add
}


async GetFilter(value) {
    var endPoint = new Request(`${SharedData.BASE_URL}components/ads?state=`+ value.status,
    { method: 'GET',}
    )
  const request = endPoint
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
       request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
        const response = await fetch( request);
  const responsecategoryfilter = await response.json();
  this.getfilterResult = responsecategoryfilter;
  return this.getfilterResult;
}
async Activation(element) {
  const data = {_id:element._id};
const bodyobj = JSON.stringify(data);
const request = new Request(`${SharedData.BASE_URL}components/ads/changeState`,
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
async Delete(element) {
  const data = {};
const bodyobj = JSON.stringify(data);
const request = new Request(`${SharedData.BASE_URL}components/ads/`+element._id,
{
method: 'DELETE',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', this.token);
request.headers.append('lang', 'ar');
        const response = await fetch( request);
  const result = await response.json();
    this.toastr.success('Successfully Deleted!');
  this.delete = result;
  return this.delete;
}
}
