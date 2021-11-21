import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedData } from '../../Shared/sharedClass';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData   : any;
  isLoggedIn = false;
   result: any;

   constructor(private firebaseAuth : AngularFireAuth,
               private router : Router,
               private http:HttpClient,
               private toastr : ToastrService) {
   }

   /*
    *  getLocalStorageUser function is used to get local user profile data.
    */
   getLocalStorageUser(){
      this.userData = JSON.parse(localStorage.getItem("headerToken"));
      if(this.userData) {
         this.isLoggedIn = true;
         return true;
      } else {
         this.isLoggedIn = false;
         return false;
      }
   }
   async login(value) {
      const data = {email: value.email, password: value.password};
      const bodyobj = JSON.stringify(data);
      const request = new Request(`${SharedData.BASE_URL}auth/users/login/email`, {
        method: 'POST',
        body: bodyobj
    });
     request.headers.delete('Content-Type');
    request.headers.append('Content-Type', 'application/json');
    const response = await fetch( request);
    const responsedata = await response.json();
    let message = responsedata.message;
    if (message) {
      this.toastr.error(message);
      this.router.navigate(['/session/login']);
    }
     else{
      this.getrsponse(responsedata);
      this.Profile()
    }
   }
   getrsponse(resposne) {
      this.toastr.success('Successfully Logged In!');
      this.router.navigate(['/']);
      this.userData = resposne['x-auth-token'];
      this.setHeader(this.userData)
  }

   /*
    * logOut function is used to sign out
    */
   logOut() {
      localStorage.removeItem("headerToken");
      this.isLoggedIn = false;
      this.toastr.success("Successfully logged out!");
      this.router.navigate(['/session/login']);
   }

   setHeader(value){
   	localStorage.setItem("headerToken", JSON.stringify(value));      
      this.getLocalStorageUser();
      this.isLoggedIn = true;
   }
   async Update(value){
      const data = {oldPass: value.old, newPass: value.new};
      const bodyobj = JSON.stringify(data);
      const request = new Request(`${SharedData.BASE_URL}auth/users/changePassword`,
      { method: 'PUT',
      body: bodyobj
      });
            request.headers.delete('Content-Type');
            request.headers.append('Content-Type', 'application/json');
           request.headers.append('x-auth-token', this.userData);
              request.headers.append('lang', 'ar');
            const response = await fetch( request);
      const responsedata = await response.json();
      this.result = responsedata;
      this.toastr.success("Successfully Updated")
      return this.result;
   }

   async Profile() {
      const request = new Request(`${SharedData.BASE_URL}auth/users/me`,
      { method: 'GET',
      });
            request.headers.delete('Content-Type');
            request.headers.append('Content-Type', 'application/json');
           request.headers.append('x-auth-token', this.userData);
              request.headers.append('lang', 'ar');
            const response = await fetch( request);
      const responsedata = await response.json();
      this.result = responsedata;
      this.adminRole(this.result.adminType)
      return this.result;
    }

    adminRole(value){
   	localStorage.setItem("adminRole", JSON.stringify(value));      
      this.getLocalStorageUser();
   }
}
