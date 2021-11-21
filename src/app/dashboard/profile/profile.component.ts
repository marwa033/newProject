import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile;
  name;
  email;
  type;
  phone;
  updateFlag: boolean =false;
  constructor(public authService: AuthService,
              private spinner: NgxSpinnerService,) { }

  ngOnInit() {
    this.authService.Profile().
    then( responseAds => { this.profile = responseAds;
      this.name = this.profile.name;
      this.email = this.profile.email;
      this.phone = this.profile.phone;
      this.type = this.profile.adminType;
  });
  }

}
