import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SharedData } from 'app/Shared/sharedClass';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  token = JSON.parse(localStorage.getItem("headerToken"));
  filter;
  district;
  get;
  active: any;
  getfilterDistrictResult: any;
  constructor(private toastr : ToastrService,
    private router: Router,) { }

    async Get() {
      const request = new Request(`${SharedData.BASE_URL}auth/clients`,
      { method: 'GET',
      });
            request.headers.delete('Content-Type');
            request.headers.append('Content-Type', 'application/json');
           request.headers.append('x-auth-token', this.token);
              request.headers.append('lang', 'ar');
            const response = await fetch( request);
      const responsedata = await response.json();
      this.get = responsedata;
      return this.get;
    }
  
async GetFilter(value) {
  const request = new Request(`${SharedData.BASE_URL}auth/clients?state=`+ value.status,
  { method: 'GET',})
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
       request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
        const response = await fetch( request);
  const responsedistrictfilter = await response.json();
  this.filter = responsedistrictfilter;
  return this.filter;
}
}
