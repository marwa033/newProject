import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SharedData } from 'app/Shared/sharedClass';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class WinchService {
  token = JSON.parse(localStorage.getItem("headerToken"));
  districtresult;
  district;
  active: any;
  getfilterDistrictResult: any;
  winch: any;
  result: any;
  constructor(private toastr : ToastrService,
    private router: Router,) { }

  async Get() {
    const request = new Request(`${SharedData.BASE_URL}auth/winches`,
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
  
  async GetId(id) { 
    const request = new Request(`${SharedData.BASE_URL}auth/winches/`+id,
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

  async Add(value) {
    const data = {name:{ en: value.enname , ar: value.arname},
    carNumber:value.car,
    lat:value.lat,
    lng: value.lng,
    user:{name: value.user, email:value.email, phone: value.phone, password: value.password}  
  };  
    const bodyobj = JSON.stringify(data);
    const request = new Request(`${SharedData.BASE_URL}auth/winches`, {
      method: 'POST',
      body: bodyobj
  });
  request.headers.delete('Content-Type');
  request.headers.append('Content-Type', 'application/json');
 request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
  
  const response = await fetch( request);
  const getWinch = await response.json();
  let message = getWinch.message;
  if (message) {
    this.toastr.error(message);
  
  }
   else{
    this.toastr.success('Successfully Added');
    this.router.navigate(['./dashboard/winch']);
  }
  this.winch = getWinch;
  return this.winch
}
async Update(value, id) {
  const data = {name:{ en: value.enname , ar: value.arname},
  carNumber:value.car,
  _id:id,
  lat:value.lat,
  lng: value.lng,
  user:{name: value.user, email:value.email, phone: value.phone, password: value.password}  
};  
  const bodyobj = JSON.stringify(data);
  const request = new Request(`${SharedData.BASE_URL}auth/winches`, {
    method: 'PUT',
    body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', this.token);

const response = await fetch( request);
const getWinch = await response.json();
let message = getWinch.message;
if (message) {
  this.toastr.error(message);

}
 else{
  this.toastr.success('Successfully Updated');
  this.router.navigate(['./dashboard/winch']);
}
this.winch = getWinch;
return this.winch
}


async GetFilter(value) {
  const request = new Request(`${SharedData.BASE_URL}auth/winches?state=`+ value.status,
  { method: 'GET',})
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
