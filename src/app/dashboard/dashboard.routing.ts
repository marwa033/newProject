import { Routes } from '@angular/router';
import { SaasComponent } from './saas/saas.component';
import { CrmComponent } from './crm/crm.component';
import { AdddistrictComponent } from './district/adddistrict/adddistrict.component';
import { DistrictComponent } from './district/district.component';
import { AddcategoryComponent } from './category/addcategory/addcategory.component';
import { CategoryComponent } from './category/category.component';
import { AddAddressComponent } from './address/add-address/add-address.component';
import { AddressComponent } from './address/address.component';
import { AddAdsComponent } from './ads/add-ads/add-ads.component';
import { AdsComponent } from './ads/ads.component';
import { AddPromoComponent } from './promocodes/add-promo/add-promo.component';
import { PromocodesComponent } from './promocodes/promocodes.component';
import { AddProductsComponent } from './products/add-products/add-products.component';
import { ProductsComponent } from './products/products.component';
import { AddAdminsComponent } from './admins/add-admins/add-admins.component';
import { AdminsComponent } from './admins/admins.component';
import { AddMechanicalComponent } from './mechanical/add-mechanical/add-mechanical.component';
import { MechanicalComponent } from './mechanical/mechanical.component';
import { AddWinchComponent } from './winch/add-winch/add-winch.component';
import { WinchComponent } from './winch/winch.component';
import { ClientsComponent } from './clients/clients.component';
import { ProfileComponent } from './profile/profile.component';
import { WinchesOrderComponent } from './winches-order/winches-order.component';
import { ProductsOrderComponent } from './products-order/products-order.component';
import { VendorsOrderComponent } from './vendors-order/vendors-order.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ViewWinchComponent } from './winches-order/view-winch/view-winch.component';
import { ViewVendorComponent } from './vendors-order/view-vendor/view-vendor.component';
import { ViewProductComponent } from './products-order/view-product/view-product.component';



export const DashboardRoutes: Routes = [
   {
      path: '',
      redirectTo: 'crm',
      pathMatch: 'full'
   },
   {
      path: '',
      children: [
         {
            path: 'showcategory',
            component: SaasComponent
         },
         {
            path: 'crm',
            component : CrmComponent
         },
         {
         path: 'district',
         component: DistrictComponent
         },
         {
         path: 'adddistrict',
         component: AdddistrictComponent
         },
         {
         path: 'adddistrict/:id',
         component: AdddistrictComponent
         },
         {
         path: 'category',
         component: CategoryComponent
         },
         {
         path: 'addcategory',
         component: AddcategoryComponent
         },
         {
         path: 'addcategory/:id',
         component: AddcategoryComponent
         },
         {
         path: 'address',
         component: AddressComponent
         },
         {
         path: 'addaddress',
         component: AddAddressComponent
         },
         {
         path: 'addaddress/:id',
         component: AddAddressComponent
         },
         {
         path: 'ads',
         component: AdsComponent
         },
         {
         path: 'addads',
         component: AddAdsComponent
         },
         {
         path: 'addads/:id',
         component: AddAdsComponent
         },
         {
         path: 'promo',
         component: PromocodesComponent
         },
         {
         path: 'addpromo',
         component: AddPromoComponent
         },
         {
         path: 'addpromo/:id',
         component: AddPromoComponent
         },
         {
         path: 'products',
         component: ProductsComponent
         },
         {
         path: 'addproduct',
         component: AddProductsComponent
         },
         {
         path: 'addproduct/:id',
         component: AddProductsComponent
         },
         {
         path: 'admins',
         component: AdminsComponent
         },
         {
         path: 'addadmin',
         component: AddAdminsComponent
         },
         {
         path: 'addadmin/:id',
         component: AddAdminsComponent
         },
         {
         path: 'mechanical',
         component: MechanicalComponent
         },
         {
         path: 'addmechanical',
         component: AddMechanicalComponent
         },
         {
         path: 'addmechanical/:id',
         component: AddMechanicalComponent
         },
         {
         path: 'clients',
         component: ClientsComponent
         },
         {
         path: 'winch',
         component: WinchComponent
         },
         {
         path: 'addwinch',
         component: AddWinchComponent
         },
         {
         path: 'addwinch/:id',
         component: AddWinchComponent
         },
         {
         path: 'profile',
         component: ProfileComponent
         },
         {
         path: 'winchorder',
         component: WinchesOrderComponent
         },
         {
         path: 'vendororder',
         component: VendorsOrderComponent
         },
         {
         path: 'productorder',
         component: ProductsOrderComponent
         },
         {
         path: 'changepassword',
         component: ChangePasswordComponent
         },
         {
         path: 'viewwinch/:id',
         component: ViewWinchComponent
         },
         {
         path: 'viewVendor/:id',
         component: ViewVendorComponent
         },
         {
         path: 'viewproduct/:id',
         component: ViewProductComponent
         },
         
         ]
   }
];

