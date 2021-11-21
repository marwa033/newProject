import {filter} from 'rxjs/operators';
import { Component, OnInit, AfterContentChecked, ViewChild, HostListener, ViewEncapsulation, Injectable, ChangeDetectorRef} from '@angular/core';
import { MenuItems } from '../core/menu/menu-items/menu-items';
import { BreadcrumbService } from 'ng5-breadcrumb';
import { PageTitleService } from '../core/page-title/page-title.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TourService } from 'ngx-tour-md-menu';
import PerfectScrollbar from 'perfect-scrollbar';
import { AuthService } from '../service/auth-service/auth.service';
import { CoreService } from '../service/core/core.service';
import { Location } from '@angular/common'
import { CellOptionsDialogService } from '@syncfusion/ej2-angular-documenteditor';
import { SaasComponent } from '../dashboard/saas/saas.component';
import { MatTableDataSource } from '@angular/material';
import { NgxSpinnerService } from "ngx-spinner";
declare var require: any

const screenfull = require('screenfull');

@Injectable({
	providedIn: 'root'
  })
@Component({
	selector: 'gene-layout',
	templateUrl:'./main-material.html',
	styleUrls: ['./main-material.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
	 '(window:resize)': 'onResize($event)'
	}
})

export class MainComponent implements OnInit, AfterContentChecked {
	chatList              : any;
	currentUrl            : any;
	root                  : any ;
	layout                : any ="rtl";
	currentLang           : any ;
	customizerIn          : boolean = false;
	showSettings          : boolean = false;
	chatpanelOpen         : boolean = false;
	sidenavOpen           : boolean = true;
	isMobile              : boolean = false;   
	isFullscreen          : boolean = false;
	collapseSidebarStatus : boolean;
	header                : string;
	dark                  : boolean;
	compactSidebar        : boolean;
	isMobileStatus        : boolean;
	sidenavMode           : string = 'side';
	popupDeleteResponse   : any;
	sidebarColor          : any;
	url                   : string;
	windowSize            : number;
	
	dataSource: MatTableDataSource<unknown>;
	selectImage = 'assets/img/en.png';
	private _routerEventsSubscription  : Subscription;
	private _router                    : Subscription;
	@ViewChild('sidenav',{static : true}) sidenav;

	langArray : any [] = [
		{  
		   img:"assets/img/en.png",
		   name:"English",
		   value	: "en"
		},
		{  
		   img:"assets/img/ar.png",
		   name:"Arabic",
		   value:"ar"
		},
  
	 ];
  
	setLang(lang) {
		for(let data of this.langArray) {
		   if(lang == data.value) {
			  if(lang === 'ar'){
				if(confirm("You will start from the home page again")){
					this.selectImage = data.img;
				  this.layout = 'rtl';
					this.router.navigate(['dashboard/crm'])
					this.translate.setDefaultLang('ar')
					this.translate.use(lang);}
			  }else{
				if(confirm("You will start from the home page again")){
					this.selectImage = data.img;
				  this.layout = 'ltr';
				  this.router.navigate(['dashboard/crm'])
				  this.translate.setDefaultLang('en')
				  this.translate.use(lang);
				}
			  }		
			  
			  this.getlang(lang);	
			  break;
			  
		   }
		}
	 } 
	  getlang(value) {
		localStorage.setItem('language', JSON.stringify(value));
		var  lang = JSON.parse(localStorage.getItem('language'));
		// console.log(lang)
	}
	headerFilterClass : any = [
		{
			headerSelect  :"header-color-1",
			colorSelect   :"header-color-dark"
		},
		{
			headerSelect  :"header-color-2",
			colorSelect   :"header-color-primary"
		},
		{
			headerSelect  :"header-color-3",
			colorSelect   :"header-color-accent"
		},
		{
			headerSelect  :"header-color-4",
			colorSelect   :"header-color-warning"
		},
		{
			headerSelect  :"header-color-5",
			colorSelect   :"header-color-green"
		}
	]

	constructor(public tourService: TourService, 
					public menuItems: MenuItems, 
					public location: Location, 
					private route: ActivatedRoute,
					private spinner: NgxSpinnerService,
					private breadcrumbService: BreadcrumbService, 
					private pageTitleService: PageTitleService, 
					public translate: TranslateService, 
					private router: Router,
					private authService : AuthService,
					public coreService : CoreService,
					private routes :Router,
					private activatedRoute: ActivatedRoute ) {

		const browserLang: string = translate.getBrowserLang();
		translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

		breadcrumbService.addFriendlyNameForRoute('/dashboard', 'Dashboard');
		breadcrumbService.addFriendlyNameForRoute('/dashboard/saas', 'showcategory');
	}
	ngAfterContentChecked() {
        // this.changeDetectorRefs.detectChanges();
    }
	ngOnInit() {

	}

	 
	/**
	  *As router outlet will emit an activate event any time a new component is being instantiated.
	  */
	onActivate(e, scrollContainer) {
		scrollContainer.scrollTop = 0;
	}

	/**
	  * toggleFullscreen method is used to show a template in fullscreen.
	//   */
	toggleFullscreen() {
		if (screenfull.enabled) {
			screenfull.toggle();
				this.isFullscreen = !this.isFullscreen;
		}
	}
	
	/**
	  * customizerFunction is used to open and close the customizer.
	  */
customizerFunction() {
this.customizerIn = !this.customizerIn;
}

/**
	  * addClassOnBody method is used to add a add or remove class on body.
	  */
addClassOnBody(event) {
var body = document.body;
if(event.checked) {
body.classList.add('dark-theme-active');
} else {
body.classList.remove('dark-theme-active');
}
}

	/**
	  * changeRTL method is used to change the layout of template.
	  */
	changeRTL(isChecked) {
		if(isChecked) {
			this.layout = "rtl"
		} else {
			this.layout = "ltr"
		}
	}

	/**
	  * toggleSidebar method is used a toggle a side nav bar.
	  */
	toggleSidebar() {
		this.coreService.sidenavOpen = !this.coreService.sidenavOpen;
	}

	/**
	  * logOut method is used to log out the  template.
	  */
	logOut() {    
		this.authService.logOut();
	}
	profile(){
		this.router.navigate(['dashboard/profile']);
	}
	password(){
		this.router.navigate(['dashboard/changepassword']);
	}

	/**
	  * sidebarFilter function filter the color for sidebar section.
	  */


	/**
	  * headerFilter function filter the color for header section.
	  */
	headerFilter(selectedFilter) {
		for(var i = 0; i<this.headerFilterClass.length; i++) {
			document.getElementById('main-app').classList.remove(this.headerFilterClass[i].colorSelect);
			if(this.headerFilterClass[i].colorSelect == selectedFilter.colorSelect) {
				document.getElementById('main-app').classList.add(this.headerFilterClass[i].colorSelect);
			}
		}
		document.querySelector('.radius-active').classList.remove('radius-active');
		document.getElementById(selectedFilter.headerSelect).classList.add('radius-active');
	}

	/**
	  *chatMenu method is used to toggle a chat menu list.
	  */
	chatMenu() {
		document.getElementById("gene-chat").classList.toggle("show-chat-list");
	}

	/**
	  * onChatOpen method is used to open a chat window.
	  */
	onChatOpen() {
		document.getElementById('chat-open').classList.toggle('show-chat-window');
	}

	/**
	  * onChatWindowClose method is used to close the chat window.
	  */  
	chatWindowClose() {
		document.getElementById("chat-open").classList.remove("show-chat-window");
	}

	collapseSidebar(event) {
		document.getElementById('main-app').classList.toggle('collapsed-sidebar');
	}

	//onResize method is used to set the side bar according to window width.
	onResize(event) {
		this.windowSize = event.target.innerWidth;
		this.resizeSideBar();
	}   

	//customizeSidebar method is used to change the side bar behaviour.
	customizeSidebar() {
		if((this.url === '/dashboard/courses' || this.url === '/courses/courses-list' || this.url === '/courses/course-detail' || this.url === '/ecommerce/shop' || this.url === '/ecommerce/checkout' || this.url === '/ecommerce/invoice') && this.windowSize<1920) {
			this.coreService.sidenavMode = 'over';
			this.coreService.sidenavOpen = false;
			if(!(document.getElementById('main-app').classList.contains('sidebar-overlay'))) {
				document.getElementById('main-app').className += " sidebar-overlay";
			}
		  
		} else if((window.innerWidth>1200) && (this.url == '/dashboard/crypto' || this.url == '/crypto/marketcap' || this.url == '/crypto/wallet' || this.url == '/crypto/trade')) {
			this.collapseSidebarStatus = this.coreService.collapseSidebar;
			if((this.collapseSidebarStatus == false)  && (window.innerWidth>1200)) {
				document.getElementById('main-app').className += ' collapsed-sidebar';
				this.coreService.collapseSidebar = true; 
				this.coreService.sidenavOpen = true;
				this.coreService.sidenavMode = 'side';
				document.getElementById('main-app').classList.remove('sidebar-overlay');
			}
		} else if((window.innerWidth>1200) && !(this.url === '/dashboard/courses' || this.url === '/courses/courses-list' || this.url === '/courses/course-detail' || this.url === '/ecommerce/shop' || this.url === '/ecommerce/checkout' || this.url === '/ecommerce/invoice')) {
			this.coreService.sidenavMode = 'side';
			this.coreService.sidenavOpen = true;
			//for responsive 
			var main_div = document.getElementsByClassName('app');
			for(let i = 0; i<main_div.length; i++) {
				if(main_div[i].classList.contains('sidebar-overlay')) {
					document.getElementById('main-app').classList.remove('sidebar-overlay');
				}
			}
		} else if(window.innerWidth<1200) {
			this.coreService.sidenavMode = 'over';  
			this.coreService.sidenavOpen = false;
			var main_div = document.getElementsByClassName('app');
			for(let i = 0; i<main_div.length; i++) {
				if(!(main_div[i].classList.contains('sidebar-overlay'))) {
					document.getElementById('main-app').className += " sidebar-overlay";
				}
			}
		}
	}

	//To resize the side bar according to window width.
	resizeSideBar() {
		if(this.windowSize < 1200) {
			this.isMobileStatus = true;
			this.isMobile = this.isMobileStatus;
			this.coreService.sidenavMode = 'over';  
			this.coreService.sidenavOpen = false;
			//for responsive
			var main_div = document.getElementsByClassName('app');
			for(let i = 0; i<main_div.length; i++) {
				if(!(main_div[i].classList.contains('sidebar-overlay'))) {
					if(document.getElementById('main-app')) {
					  document.getElementById('main-app').className += " sidebar-overlay";
					}
				}
			}
		} else if((this.url === '/dashboard/courses' || this.url === '/courses/courses-list' || this.url === '/courses/course-detail' || this.url === '/ecommerce/shop' || this.url === '/ecommerce/checkout' || this.url === '/ecommerce/invoice') && this.windowSize<1920) {
			this.customizeSidebar();
		} else {
			this.isMobileStatus = false;
			this.isMobile = this.isMobileStatus;
			this.coreService.sidenavMode = 'side';
			this.coreService.sidenavOpen = true;
			//for responsive
			var main_div = document.getElementsByClassName('app');
			for(let i = 0; i<main_div.length; i++) {
				if(main_div[i].classList.contains('sidebar-overlay')) {
					document.getElementById('main-app').classList.remove('sidebar-overlay');
				}
			}
		}
	}
}


