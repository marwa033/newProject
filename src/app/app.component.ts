import {Component, Optional, ViewEncapsulation} from '@angular/core';
import { TranslateService} from '@ngx-translate/core';
@Component({
  	selector: 'gene-app',
   template:`<router-outlet></router-outlet>
   			<ngx-loading-bar></ngx-loading-bar>`,
   encapsulation: ViewEncapsulation.None
})

export class GeneAppComponent {
   
	layout                : any ="ltr";
  lang = JSON.parse(localStorage.getItem('language'));
   constructor(translate: TranslateService,) {
      translate.addLangs(['en' , 'ar' ]);

      if(this.lang === 'ar'){
         this.layout= 'rtl'
      translate.setDefaultLang('ar');
   }else{
      this.layout= 'ltr'
      translate.setDefaultLang('en');
   }
   // translate.onLangChange.subscribe((lang)=>{
   //    location.reload()
      
   // })
      const browserLang: string = translate.getBrowserLang();
      translate.use(browserLang.match(/en|ar/) ? browserLang : 'en');
   }
}
