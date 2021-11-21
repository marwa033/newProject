import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../category/Category.service';
import { DistrictService } from '../district/district.service';
import { ProductsService } from './products.service';

@Component({
  selector: 'ms-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products;
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['count', 'image' ,'name', 'price' ,  'createdAt', 'updatedAt', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  tries: any;
  districtsDropdwn: any;
  categories: any;
  name: string;
  categoryId: string;
  status: string;
 
  constructor(
    public productService: ProductsService,
    public categoryService: CategoryService,
    private toastr : ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router) {
    }

  ngOnInit(): void {
  this.Products()
  this.getCategories()
  }
   
  getCategories(){
    let type = "products"
    this.categoryService.GetCategories(type).
    then( responsedata => { 
      this.categories = responsedata.data;
    });
} 
  Products(){
    this.spinner.show()
     this.productService.GetProduct().
              then( responsedistrictdata => { this.products = responsedistrictdata.data;
                // this.districtsDropdwn = responsedistrictdata.data
                 this.dataSource = new MatTableDataSource(responsedistrictdata.data);
                 this.dataSource.paginator = this.paginator;
                 setTimeout(() => {
                  this.spinner.hide();
                }, this.products);
             }
             )
            }
  editRow(element) {
    let id = element._id
    this.router.navigate([`dashboard/addproduct/` + id])
    }
    
  Active(element){
    this.spinner.show()
    this.productService.productsActivation(element).
    then( responseAds => { this.tries = responseAds;
      this.Products()
     });
}
  Filter(value){
    if(this.name != undefined || this.categoryId != undefined || this.status != undefined){
    this.spinner.show()
      this.productService.GetFilter(value).
      then( responsedistrictfilter => { this.products = responsedistrictfilter.data;
         this.dataSource = new MatTableDataSource(responsedistrictfilter.data);
         this.dataSource.paginator = this.paginator;
         setTimeout(() => {
          this.spinner.hide();
        }, this.products);
      });
    }else{
      this.toastr.error("nothing to search for")
    }

 }
 action(){
   this.name = undefined;
   this.categoryId = undefined;
   this.status = undefined;
   this.Products()
 }
}
