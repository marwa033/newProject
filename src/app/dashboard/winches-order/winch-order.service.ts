import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SharedData } from 'app/Shared/sharedClass';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class WinchOrderService {

  token = JSON.parse(localStorage.getItem("headerToken"));
  results: any;
  cancel: any;
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
    
async Get() {
  const request = new Request(`${SharedData.BASE_URL}components/orders?type=winch`,
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
