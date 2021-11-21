import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth-service/auth.service';
import { PageTitleService } from '../../core/page-title/page-title.service';
import * as $ from 'jquery';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ms-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.scss']
})

export class CrmComponent implements OnInit {
  
   constructor(public translate: TranslateService,
      public authService: AuthService,
     private pageTitleService: PageTitleService ,
     private spinner: NgxSpinnerService) {}
            
 
   ngOnInit() {
   }

} 
