import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatInputModule,
			MatFormFieldModule,
			MatCardModule,
			MatButtonModule,
			MatIconModule,
			MatCheckboxModule,
			MatDividerModule,
			MatToolbarModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';


import { ToastrModule } from 'ngx-toastr';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { SessionRoutes } from './session.routing';


@NgModule({
	declarations: [
		LoginComponent,
	],
	imports: [
		NgxSpinnerModule,
		CommonModule,
		MatInputModule,
		MatFormFieldModule,
		FlexLayoutModule,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		MatToolbarModule,
		MatCheckboxModule,
		MatDividerModule,
		FormsModule,
		TranslateModule,
		ReactiveFormsModule,
		RouterModule.forChild(SessionRoutes),
		ToastrModule.forRoot(),
		SlickCarouselModule,
		MatSelectModule,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SessionModule { }
