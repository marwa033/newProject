import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  old;
  new;
  password;
  constructor(public authService: AuthService,
              private spinner: NgxSpinnerService,) { }

  ngOnInit() {
  }

  Update(value){
    this.authService.Update(value).
    then( responseAds => { this.password = responseAds;
  });
  }
}
