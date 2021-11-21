import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedData } from '../../Shared/sharedClass';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  token = JSON.parse(localStorage.getItem("headerToken"));
  getCategoryResult;
  category;
  getfilterCategorytResult: any;
  active: any;
  categoryresult: any;
  constructor(private toastr : ToastrService,
    private router: Router,) { }
  
  async GetCategories(type) {
    const request = new Request(`${SharedData.BASE_URL}components/categories?type=`+type,
    { method: 'GET',
    });
          request.headers.delete('Content-Type');
          request.headers.append('Content-Type', 'application/json');
         request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
          const response = await fetch( request);
    const responsedata = await response.json();
    this.getCategoryResult = responsedata;
    return this.getCategoryResult;
  }

  async GetSubCategories(type, parentId) {
    const request = new Request(`${SharedData.BASE_URL}components/categories?type=`+type + '&parentId=' + parentId,
    { method: 'GET',
    });
          request.headers.delete('Content-Type');
          request.headers.append('Content-Type', 'application/json');
         request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
          const response = await fetch( request);
    const responsedata = await response.json();
    this.getCategoryResult = responsedata;
    return this.getCategoryResult;
  }


  
  async Add(value) {
    const data = {name:{ en: value.enname , ar: value.arname},
     image:value.imageSrc,
     color: value.color,
     type: value.type,
     parentId: value.categoryId};  
    const bodyobj = JSON.stringify(data);
    const request = new Request(`${SharedData.BASE_URL}components/categories`, {
      method: 'POST',
      body: bodyobj
  });
  request.headers.delete('Content-Type');
  request.headers.append('Content-Type', 'application/json');
 request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
  
  const response = await fetch( request);
  const getAddCategory = await response.json();
  let message = getAddCategory.message;
  if (message) {
    this.toastr.error(message);
  
  }
   else{
    this.toastr.success('Successfully Added');
    this.router.navigate(['./dashboard/category']);
  }
  this.category = getAddCategory;
  return this.category
}


  
async Update(value,id) {
  const data = {name:{ en: value.enname , ar: value.arname},
   image:value.imageSrc,
   color: value.color,
   type: value.type,
   _id: id,
   parentId: value.categoryId};  
  const bodyobj = JSON.stringify(data);
  const request = new Request(`${SharedData.BASE_URL}components/categories`, {
    method: 'PUT',
    body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', this.token);

const response = await fetch( request);
const getAddCategory = await response.json();
let message = getAddCategory.message;
if (message) {
  this.toastr.error(message);

}
 else{
  this.toastr.success('Successfully Updated');
  this.router.navigate(['./dashboard/category']);
}
this.category = getAddCategory;
return this.category
}


// async GetFilterCategory(value) {
//   console.log('*')
//   if(value.type === ""){
//     value.type = undefined
//   }
//   if(value.categoryId === ""){
//     value.categoryId = undefined
//   }
//   if(value.status === ""){
//     value.status = undefined
//   }
//   if(value.status != undefined && value.categoryId === undefined && value.type === undefined){
//     var endPoint = new Request(`${SharedData.BASE_URL}components/categories?state=`+ value.status,
//     { method: 'GET',}
//     )
//   }else if(value.categoryId != undefined && value.type === undefined && value.status === undefined){
//     var endPoint = new Request(`${SharedData.BASE_URL}components/categories?parentId=`+ value.categoryId,
//     { method: 'GET',}
//     )
//   }else if(value.type != undefined && value.status === undefined && value.categoryId === undefined){
//     var endPoint = new Request(`${SharedData.BASE_URL}components/categories?type=`+ value.type,
//     { method: 'GET',}
//     )
//   }else if(value.status != undefined && value.type != undefined && value.categoryId === undefined){
//     var endPoint = new Request(`${SharedData.BASE_URL}components/categories?state=`+ value.status + '&type=' + value.type,
//     { method: 'GET',}
//     )
//   }else if(value.status != undefined && value.categoryId != undefined && value.type === undefined){
//     var endPoint = new Request(`${SharedData.BASE_URL}components/categories?state=`+ value.status + '&parentId=' + value.categoryId,
//     { method: 'GET',}
//     )
//   }else if(value.type != undefined && value.categoryId != undefined && value.status === undefined){
//     var endPoint = new Request(`${SharedData.BASE_URL}components/categories?type=`+ value.type + '&parentId=' + value.categoryId,
//     { method: 'GET',}
//     )
//   }
//   else{
//     var endPoint = new Request(`${SharedData.BASE_URL}components/categories?type=`+ value.type + '&parentId=' + value.categoryId +
//     '&state='+value.status,
//     { method: 'GET',}
//     )
//   }
//   const request = endPoint
//         request.headers.delete('Content-Type');
//         request.headers.append('Content-Type', 'application/json');
//        request.headers.append('x-auth-token', this.token);
//             request.headers.append('lang', 'ar');
//         const response = await fetch( request);
//   const responsecategoryfilter = await response.json();
//   this.getfilterCategorytResult = responsecategoryfilter;
//   return this.getfilterCategorytResult;
// }


async categoryActivation(element) {
  const data = {_id:element._id};
const bodyobj = JSON.stringify(data);
const request = new Request(`${SharedData.BASE_URL}components/categories/changeState`,
{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', this.token);
// console.log(log);
        const response = await fetch( request);
  const result = await response.json();
    this.toastr.info('Change State');
    // this.router.navigate(['/dashboard/showads']);
  this.active = result;
  return this.active;
}


async GetCategoryId(id) {
    
  const request = new Request(`${SharedData.BASE_URL}components/categories/`+id,
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
       request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
        const response = await fetch( request);
  const responsedata = await response.json();
  this.categoryresult = responsedata;
  return this.categoryresult;
}





async GetFilterCategory(value) {
  console.log('*')
  if(value.type === ""){
    value.type = undefined
  }
  if(value.status === ""){
    value.status = undefined
  }
  if(value.status != undefined && value.type === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}components/categories?state=`+ value.status,
    { method: 'GET',}
    )
  }else if(value.type != undefined && value.status === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}components/categories?type=`+ value.type,
    { method: 'GET',}
    )
  }else if(value.status != undefined && value.type != undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}components/categories?state=`+ value.status + '&type=' + value.type,
    { method: 'GET',}
    )
  }
  else{
    var endPoint = new Request(`${SharedData.BASE_URL}components/categories?type=`+ value.type + '&parentId=' + '&state='+value.status,
    { method: 'GET',}
    )
  }
  const request = endPoint
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
       request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
        const response = await fetch( request);
  const responsecategoryfilter = await response.json();
  this.getfilterCategorytResult = responsecategoryfilter;
  return this.getfilterCategorytResult;
}
}
