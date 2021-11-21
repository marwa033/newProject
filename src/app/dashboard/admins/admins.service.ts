import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SharedData } from 'app/Shared/sharedClass';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {
  token = JSON.parse(localStorage.getItem("headerToken"));
  active: any;
  getfilterDistrictResult: any;
  add: any;
  result: any;
  getResult: any;
  delete: any;
  constructor(private toastr : ToastrService,
    private router: Router,) { }


    async GetId(id) {
    
      const request = new Request(`${SharedData.BASE_URL}auth/admins/`+id,
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
    async Get() {
      const request = new Request(`${SharedData.BASE_URL}auth/admins`,
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

  async Add(value) {
    const data = {
      role: value.role,
      user:{
        name: value.name,
        email: value.email,
        phone: value.phone,
        password: value.password,
      }
    };  
    const bodyobj = JSON.stringify(data);
    const request = new Request(`${SharedData.BASE_URL}auth/admins`, {
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
    this.router.navigate(['./dashboard/admins']);
  }
  this.add = getAdd;
  return this.add
}

async Update(value, id) {
  const data = {
    role: value.role,
    _id: id,
    user:{
      name: value.name,
      email: value.email,
      phone: value.phone,
      password: value.password,
    }
  };  
  const bodyobj = JSON.stringify(data);
  const request = new Request(`${SharedData.BASE_URL}auth/admins`, {
    method: 'PUT',
    body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', this.token);

const response = await fetch( request);
const getAdd = await response.json();
let message = getAdd.message;
if (message) {
  this.toastr.error(message);

}
 else{
  this.toastr.success('Successfully Updated');
  this.router.navigate(['./dashboard/admins']);
}
this.add = getAdd;
return this.add
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

async Delete(element) {
  const data = {
  };  
const bodyobj = JSON.stringify(data);
const request = new Request(`${SharedData.BASE_URL}auth/admins/`+ element.userId,
{
method: 'DELETE',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', this.token);
const response = await fetch( request);
const getAdd = await response.json();
let message = getAdd.message;
if (message) {
  this.toastr.error(message);

}
 else{
  this.toastr.success('Successfully Updated');
  this.router.navigate(['./dashboard/admins']);
}
}
}
