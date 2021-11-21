import { Injectable } from '@angular/core';

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
	 state: 'crm',
	 name: 'الرئسية',
	 type: 'button',
	 icon: 'home',
  },
//   {
// 	 state: 'dashboard',
// 	 name: 'المنتجات',
// 	 type: 'sub',
// 	 icon: 'shopping_cart',
// 	 children: [
// 		{state: 'products', name: 'عرض'},
// 		{state: 'addproduct', name: 'اضف'}
// 	 ]
//   },
  {
	 state: 'dashboard',
	 name: 'الفئات',
	 type: 'sub',
	 icon: 'category',
	 children: [
		{state: 'category', name: 'عرض'},
		{state: 'addcategory', name: 'اضف'}
	 ]
  },
  {
	 state: 'dashboard',
	 name: 'المنطقة',
	 type: 'sub',
	 icon: 'room',
	 children: [
		{state: 'district', name: 'عرض'},
		{state: 'adddistrict', name: 'اضف'}
	 ]
  },
  {
	 state: 'dashboard',
	 name: 'اعلانات',
	 type: 'sub',
	 icon: 'addchart',
	 children: [
		{state: 'ads', name: 'عرض'},
		{state: 'addads', name: 'اضف'}
	 ]
  },
  {
	 state: 'dashboard',
	 name: 'خصومات',
	 type: 'sub',
	 icon: 'money',
	 children: [
		{state: 'promo', name: 'عرض'},
		{state: 'addpromo', name: 'اضف'}
	 ]
  },
  {
	 state: 'dashboard',
	 name: 'المشرفين',
	 type: 'sub',
	 icon: 'supervisor_account',
	 children: [
		{state: 'admins', name: 'عرض'},
		{state: 'addadmin', name: 'اضف'}
	 ]
  },
  {
	 state: 'dashboard',
	 name: 'فنيين',
	 type: 'sub',
	 icon: 'money',
	 children: [
		{state: 'mechanical', name: 'عرض'},
		{state: 'addmechanical', name: 'اضف'}
	 ]
  },
  {
	 state: 'dashboard',
	 name: 'ونش',
	 type: 'sub',
	 icon: 'supervisor_account',
	 children: [
		{state: 'winch', name: 'عرض'},
		{state: 'addwinch', name: 'اضف'}
	 ]
  },
  {
	 state: 'dashboard',
	 name: 'عملاء',
	 type: 'sub',
	 icon: 'supervisor_account',
	 children: [
		{state: 'clients', name: 'عرض'},
	 ]
  },
  {
	 state: 'dashboard',
	 name: 'الطلبات',
	 type: 'sub',
	 icon: 'supervisor_account',
	 children: [
		{state: 'productorder', name: 'طلبات المنتجات'},
		{state: 'vendororder', name: 'طلبات الفنيين'},
		{state: 'winchorder', name: 'طلبات الونش'},
	 ]
  },
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
	 return MENUITEMS;
  }
  add(menu:any) {
	 MENUITEMS.push(menu);
  }
}
