import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SharedData } from 'app/Shared/sharedClass';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  token = JSON.parse(localStorage.getItem("headerToken"));
  product: any;
  productresult: any;
  productedie: any;
  active: any;
  getfilterResult: any;

  constructor(private toastr : ToastrService,
    private router: Router,) { }

  
  async AddProduct(value) {
    const data = {name:{ en: value.enname , ar: value.arname},
     image:value.imageSrc,
     description:{en: value.endescription , ar:value.ardescription },
     price: value.price,
     categoryId: value.categoryId};  
    const bodyobj = JSON.stringify(data);
    const request = new Request(`${SharedData.BASE_URL}components/products`, {
      method: 'POST',
      body: bodyobj
  });
  request.headers.delete('Content-Type');
  request.headers.append('Content-Type', 'application/json');
 request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
  
  const response = await fetch( request);
  const getAddProduct = await response.json();
  let message = getAddProduct.message;
  if (message) {
    this.toastr.error(message);
  
  }
   else{
    this.toastr.success('Successfully Added');
    this.router.navigate(['/dashboard/products']);
  }
  this.product = getAddProduct;
  return this.product
}


async Update(value,id) {
  const data = {name:{ en: value.enname , ar: value.arname},
   image:value.imageSrc,
   description:{en: value.endescription , ar:value.ardescription },
   price: value.price,
   _id:id,
   categoryId: value.categoryId};  
  const bodyobj = JSON.stringify(data);
  const request = new Request(`${SharedData.BASE_URL}components/products`, {
    method: 'PUT',
    body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', this.token);

const response = await fetch( request);
const getEditProduct = await response.json();
let message = getEditProduct.message;
if (message) {
  this.toastr.error(message);

}
 else{
  this.toastr.success('Successfully Updated');
  this.router.navigate(['/dashboard/products']);
}
this.productedie = getEditProduct;
return this.productedie
}


async GetProductId(id) {    
  const request = new Request(`${SharedData.BASE_URL}components/products/`+id,
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
       request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
        const response = await fetch( request);
  const responsedata = await response.json();
  this.productresult = responsedata;
  return this.productresult;
}

async GetProduct() {
  const request = new Request(`${SharedData.BASE_URL}components/products`,
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
       request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
        const response = await fetch( request);
  const responsedata = await response.json();
  this.productresult = responsedata;
  return this.productresult;
}

async productsActivation(element) {
  const data = {_id:element._id};
const bodyobj = JSON.stringify(data);
const request = new Request(`${SharedData.BASE_URL}components/products/changeState`,
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


async GetFilter(value) {
  console.log('*')
  if(value.name === ""){
    value.name = undefined
  }
  if(value.name != undefined && value.categoryId === undefined && value.status === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}components/products?name=`+ value.name,
    { method: 'GET',}
    )
  }else if(value.categoryId != undefined && value.name === undefined && value.status === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}components/products?categoryId=`+ value.categoryId,
    { method: 'GET',}
    )
  }else if(value.status != undefined && value.name === undefined && value.categoryId === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}components/products?state=`+ value.status,
    { method: 'GET',}
    )
  }else if(value.status != undefined && value.name != undefined && value.categoryId === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}components/products?state=`+ value.status + '&name=' + value.name,
    { method: 'GET',}
    )
  }else if(value.status != undefined && value.categoryId != undefined && value.name === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}components/products?state=`+ value.status + '&categoryId=' + value.categoryId,
    { method: 'GET',}
    )
  }else if(value.name != undefined && value.categoryId != undefined && value.status === undefined){
    var endPoint = new Request(`${SharedData.BASE_URL}components/products?name=`+ value.name + '&categoryId=' + value.categoryId,
    { method: 'GET',}
    )
  }
  else{
    var endPoint = new Request(`${SharedData.BASE_URL}components/products?name=`+ value.name + '&categoryId=' + value.categoryId +
    '&state='+value.status,
    { method: 'GET',}
    )
  }
  const request = endPoint
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
       request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
        const response = await fetch( request);
  const responsedistrictfilter = await response.json();
  this.getfilterResult = responsedistrictfilter;
  return this.getfilterResult;
}

}
