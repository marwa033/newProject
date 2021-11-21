import { Component, OnInit ,ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../service/auth-service/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
   selector: 'ms-login-session',
   templateUrl:'./login-component.html',
   styleUrls: ['./login-component.scss'],
   encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit{
   email: string='';
   password: string='';
   tries: any;

  constructor( public authService: AuthService,
               private spinner: NgxSpinnerService,
               public translate : TranslateService ) { }

   // when email and password is correct, user logged in.
   login(value) {
    this.spinner.show();
      this.authService.login(value).
      then( responsedata => { this.tries = responsedata; 
         setTimeout(() => {
            this.spinner.hide();
          },this.tries);
      });
   }
    ngOnInit(){
    }

    

}



