import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SharedData } from 'app/Shared/sharedClass';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class VendorOrderService {
  token = JSON.parse(localStorage.getItem("headerToken"));
  results: any;
  active: any;
  cancel: any;
  getfilterResult: any;
  constructor(private toastr : ToastrService,
    private router: Router,) { }

    async GetId(id){
      const request = new Request(`${SharedData.BASE_URL}components/orders/`+id,
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
async Get() {
  const request = new Request(`${SharedData.BASE_URL}components/orders?type=service`,
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
async Activation(value, id) {
  const data = {_id:id, state: value.state, price:value.price, vendorDescription: value.description};
const bodyobj = JSON.stringify(data);
const request = new Request(`${SharedData.BASE_URL}components/orders/vendor/changeState`,
{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', this.token);
        const response = await fetch( request);
  const result = await response.json();
    // this.toastr.info('Change State');
  this.active = result;
  return this.active;
}


async Cancel(value, id) {
  const data = {_id:id, cancelReason: value.description};
const bodyobj = JSON.stringify(data);
const request = new Request(`${SharedData.BASE_URL}components/orders/admin/cancel`,
{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', this.token);
        const response = await fetch( request);
  const result = await response.json();
    // this.toastr.success('Successfully canceled');
    let message = result.message;
if (message) {
  this.toastr.error(message);
}
 else{
  this.toastr.success('Successfully canceled');
}
  this.cancel = result;
  return this.cancel;
}


async GetFilter(value){
  
  console.log('*')
  if(value.name === ""){
    value.name = undefined
  }
  if(value.name != undefined && value.state === undefined && value.date === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}components/orders?type=service&name=`+ value.name,
    { method: 'GET',}
    )
  }else if(value.date != undefined && value.name === undefined && value.state === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}components/orders?type=service&date=`+ value.date,
    { method: 'GET',}
    )
  }else if(value.state != undefined && value.name === undefined && value.date === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}components/orders?type=service&state=`+ value.state,
    { method: 'GET',}
    )
  }else if(value.state != undefined && value.name != undefined && value.date === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}components/orders?type=service&name=`+ value.name + '&state=' + value.state,
    { method: 'GET',}
    )
  }else if(value.state != undefined && value.date != undefined && value.name === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}components/orders?type=service&state=`+ value.state + '&date=' + value.date,
    { method: 'GET',}
    )
  }else if(value.name != undefined && value.date != undefined && value.state === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}components/orders?type=service&name=`+ value.name + '&date=' + value.date,
    { method: 'GET',}
    )
  }
  else{
    var endPoint = new Request(`${SharedData.BASE_URL}components/orders?type=service&name=`+ value.name + '&date=' + value.date + 
    '&state=' + value.state,
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
  this.getfilterResult = responsedistrictfilter;
  return this.getfilterResult;

}
}
