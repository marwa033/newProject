import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedData } from '../../Shared/sharedClass';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  token = JSON.parse(localStorage.getItem("headerToken"));
  districtresult;
  district;
  active: any;
  getfilterDistrictResult: any;
  constructor(private toastr : ToastrService,
    private router: Router,) { }

  async GetDistrict() {
    const request = new Request(`${SharedData.BASE_URL}components/districts`,
    { method: 'GET',
    });
          request.headers.delete('Content-Type');
          request.headers.append('Content-Type', 'application/json');
         request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
          const response = await fetch( request);
    const responsedata = await response.json();
    this.districtresult = responsedata;
    return this.districtresult;
  }

  async GetSubDistrict(parentId) {
    const request = new Request(`${SharedData.BASE_URL}components/districts?parentId=`+ parentId,
    { method: 'GET',
    });
          request.headers.delete('Content-Type');
          request.headers.append('Content-Type', 'application/json');
         request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
          const response = await fetch( request);
    const responsedata = await response.json();
    this.districtresult = responsedata;
    return this.districtresult;
  }

  
  async GetDistrictId(id) {
    
    const request = new Request(`${SharedData.BASE_URL}components/districts/`+id,
    { method: 'GET',
    });
          request.headers.delete('Content-Type');
          request.headers.append('Content-Type', 'application/json');
         request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
          const response = await fetch( request);
    const responsedata = await response.json();
    this.districtresult = responsedata;
    return this.districtresult;
  }

  async Add(value) {
    console.log(value.districtId)
    const data = {name:{ en: value.enname , ar: value.arname},
    parentId: value.districtId};  
    const bodyobj = JSON.stringify(data);
    const request = new Request(`${SharedData.BASE_URL}components/districts`, {
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
    this.router.navigate(['./dashboard/district']);
  }
  this.district = getAddDistrict;
  return this.district
}
async Update(value, id) {
  const data = {name:{ en: value.enname , ar: value.arname},
  parentId: value.districtId, _id: id};  
  const bodyobj = JSON.stringify(data);
  const request = new Request(`${SharedData.BASE_URL}components/districts`, {
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
  this.router.navigate(['./dashboard/district']);
}
this.district = getAddDistrict;
return this.district
}

async districtActivation(element) {
  const data = {_id:element._id};
const bodyobj = JSON.stringify(data);
const request = new Request(`${SharedData.BASE_URL}components/districts/changeState`,
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

async GetFilterDistrict(value) {
  console.log('*')
  if(value.name === ""){
    value.name = undefined
  }
  if(value.name != undefined && value.districtId === undefined && value.status === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}components/districts?name=`+ value.name,
    { method: 'GET',}
    )
  }else if(value.districtId != undefined && value.name === undefined && value.status === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}components/districts?parentId=`+ value.districtId,
    { method: 'GET',}
    )
  }else if(value.status != undefined && value.name === undefined && value.districtId === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}components/districts?state=`+ value.status,
    { method: 'GET',}
    )
  }else if(value.status != undefined && value.name != undefined && value.districtId === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}components/districts?state=`+ value.status + '&name=' + value.name,
    { method: 'GET',}
    )
  }else if(value.status != undefined && value.districtId != undefined && value.name === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}components/districts?state=`+ value.status + '&parentId=' + value.districtId,
    { method: 'GET',}
    )
  }else if(value.name != undefined && value.districtId != undefined && value.status === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}components/districts?name=`+ value.name + '&parentId=' + value.districtId,
    { method: 'GET',}
    )
  }
  else{
    var endPoint = new Request(`${SharedData.BASE_URL}components/districts?name=`+ value.name + '&parentId=' + value.districtId + 
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
