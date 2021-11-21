import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SharedData } from 'app/Shared/sharedClass';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PromocodesService {
  token = JSON.parse(localStorage.getItem("headerToken"));
  results;
  active: any;
  add: any;
  getId: any;
  constructor(private toastr : ToastrService,
    private router: Router,) { }

  
async GetPromo() {
  const request = new Request(`${SharedData.BASE_URL}payments/promocodes`,
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


async Activation(element) {
  const data = {_id:element._id};
const bodyobj = JSON.stringify(data);
const request = new Request(`${SharedData.BASE_URL}payments/promocodes/changeState`,
{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', this.token);
        const response = await fetch( request);
  const result = await response.json();
    this.toastr.info('Change State');
  this.active = result;
  return this.active;
}


async Add(value) {
  console.log(value.districtId)
  const data = {code: value.code,
    startDate: value.startDate,
    daysPeriod: value.days,
    totalUsage: value.total, 
    maxNumberOfUses:value.max,
    comment: value.comment, 
    amount: value.amount, 
    type:value.type, 
    for: value.for,
    forAllClients : value.client, 
    forAllVendors: value.vendor, 
    clientIds:value.clientMulti, 
    vendorIds: value.vendorMulti};  
  const bodyobj = JSON.stringify(data);
  const request = new Request(`${SharedData.BASE_URL}payments/promocodes`, {
    method: 'POST',
    body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', this.token);
        request.headers.append('lang', 'ar');

const response = await fetch( request);
const getAdd = await response.json();
let message = getAdd.message;
if (message) {
  this.toastr.error(message);

}
 else{
  this.toastr.success('Successfully Added');
  this.router.navigate(['./dashboard/promo']);
}
this.add = getAdd;
return this.add
}



async GetById(id) {
    
  const request = new Request(`${SharedData.BASE_URL}payments/promocodes/`+id,
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


async Update(value, id) {
  console.log(value.districtId)
  const data = {code: value.code,
    _id: id,
    startDate: value.startDate,
    daysPeriod: value.days,
    totalUsage: value.total, 
    maxNumberOfUses:value.max,
    amount: value.amount, 
    type:value.type, 
    for: value.for,
    forAllClients : value.client, 
    forAllVendors: value.vendor, 
    clientIds:value.clientMulti, 
    vendorIds: value.vendorMulti};  
  const bodyobj = JSON.stringify(data);
  const request = new Request(`${SharedData.BASE_URL}payments/promocodes`, {
    method: 'PUT',
    body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', this.token);
        request.headers.append('lang', 'ar');

const response = await fetch( request);
const getAdd = await response.json();
let message = getAdd.message;
if (message) {
  this.toastr.error(message);

}
 else{
  this.toastr.success('Successfully Updated');
  this.router.navigate(['./dashboard/promo']);
}
this.add = getAdd;
return this.add
}
}
