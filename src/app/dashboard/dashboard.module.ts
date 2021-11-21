import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import {MatIconModule} from '@angular/material/icon';
import {
			MatButtonModule,
			MatTabsModule,
			MatCardModule,
			MatMenuModule,
			MatCheckboxModule,
			MatDividerModule,
			MatProgressBarModule,
         MatInputModule,      
			MatFormFieldModule,
			MatTableModule,
			MatListModule, 
			MatPaginatorModule,
			MatChipsModule,
			MatSortModule,
			MatSelectModule,
			MatDialogModule,
			MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';
			import { GridModule, PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
// import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import {MatExpansionModule} from '@angular/material/expansion';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ChartsModule } from 'ng2-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgmCoreModule } from '@agm/core';
import { EasyPieChartModule } from 'ng2modules-easypiechart';
import { TranslateModule } from '@ngx-translate/core';
import { DocumentEditorContainerAllModule } from '@syncfusion/ej2-angular-documenteditor';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { DashboardRoutes } from './dashboard.routing';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { WidgetComponentModule } from '../widget-component/widget-component.module';
import { SaasComponent } from './saas/saas.component';
import { CrmComponent } from './crm/crm.component';


import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

// import { ModalModule } from '@bit/valor-software.ngx-bootstrap.modal';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { NgxSpinnerModule } from "ngx-spinner";
import { DistrictComponent } from './district/district.component';
import { AdddistrictComponent } from './district/adddistrict/adddistrict.component';
import { CategoryComponent } from './category/category.component';
import { AddcategoryComponent } from './category/addcategory/addcategory.component';
import { AddressComponent } from './address/address.component';
import { AddAddressComponent } from './address/add-address/add-address.component';
import { ProductsComponent } from './products/products.component';
import { AddProductsComponent } from './products/add-products/add-products.component';
import { AdsComponent } from './ads/ads.component';
import { AddAdsComponent } from './ads/add-ads/add-ads.component';
import { PromocodesComponent } from './promocodes/promocodes.component';
import { AddPromoComponent } from './promocodes/add-promo/add-promo.component';
import { AdminsComponent } from './admins/admins.component';
import { AddAdminsComponent } from './admins/add-admins/add-admins.component';
import { MechanicalComponent } from './mechanical/mechanical.component';
import { AddMechanicalComponent } from './mechanical/add-mechanical/add-mechanical.component';
import { WinchComponent } from './winch/winch.component';
import { AddWinchComponent } from './winch/add-winch/add-winch.component';
import { ClientsComponent } from './clients/clients.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductsOrderComponent } from './products-order/products-order.component';
import { WinchesOrderComponent } from './winches-order/winches-order.component';
import { VendorsOrderComponent } from './vendors-order/vendors-order.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ViewVendorComponent } from './vendors-order/view-vendor/view-vendor.component';
import { ViewProductComponent } from './products-order/view-product/view-product.component';
import { ViewWinchComponent } from './winches-order/view-winch/view-winch.component';

@NgModule({
	declarations: [
		SaasComponent,
		CrmComponent,
		DistrictComponent,
		AdddistrictComponent,
		CategoryComponent,
		AddcategoryComponent,
		AddressComponent,
		AddAddressComponent,
		ProductsComponent,
		AddProductsComponent,
		AdsComponent,
		AddAdsComponent,
		PromocodesComponent,
		AddPromoComponent,
		AdminsComponent,
		AddAdminsComponent,
		MechanicalComponent,
		AddMechanicalComponent,
		WinchComponent,
		AddWinchComponent,
		ClientsComponent,
		ProfileComponent,
		ProductsOrderComponent,
		WinchesOrderComponent,
		VendorsOrderComponent,
		ChangePasswordComponent,
		ViewVendorComponent,
		ViewProductComponent,
		ViewWinchComponent,
	],
	imports: [ GridModule,
		ListViewModule ,
		MatTableModule ,
		ButtonModule,
		MatDatepickerModule,
		ChartModule ,
		RichTextEditorAllModule,
		MatExpansionModule,
		DocumentEditorContainerAllModule,
		MatDialogModule,
		CommonModule,
		MatTableModule,
		MatSelectModule,
		FlexLayoutModule,
		WidgetComponentModule,
		EasyPieChartModule,
		MatPaginatorModule,
		MatChipsModule,
      TranslateModule,
      PerfectScrollbarModule,
		RouterModule.forChild(DashboardRoutes),
		MatIconModule,
		MatButtonModule,
		MatTabsModule,
		MatCardModule,
		MatMenuModule,
		MatListModule,
		MatCheckboxModule,
		MatDividerModule,
		ChartsModule,
		NgxDatatableModule,
		MatProgressBarModule,
		MatInputModule,
		MatFormFieldModule,
		FormsModule,
		ReactiveFormsModule,
		MatSortModule,
		NgxSpinnerModule,
	],
	providers: [
		PageService, SortService, FilterService, GroupService,
		{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
		NgbModalConfig, NgbModal
	  ],
	  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
