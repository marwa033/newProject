import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from './client.service';

@Component({
  selector: 'ms-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  districts;
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['count', 'name', 'number', 'email',  'createdAt', 'updatedAt'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  tries: any;
  districtsDropdwn: any;
  status: any;
  districtId: string;
  name: string;
  clients: any;
 
  constructor(
    public clientService: ClientService,
    private spinner: NgxSpinnerService,
    private toastr : ToastrService,
    private router: Router) {
    }

  ngOnInit(): void {
  this.Clients()
  }
  Clients(){
    this.spinner.show()
     this.clientService.Get().
              then( responsedistrictdata => { this.clients = responsedistrictdata.data;
                 this.dataSource = new MatTableDataSource(responsedistrictdata.data);
                 this.dataSource.paginator = this.paginator;
                 console.log(this.clients)
                 setTimeout(() => {
                  this.spinner.hide();
                }, this.clients);
             }
             )
            }
  // editRow(element) {
  //   let id = element._id
  //   this.router.navigate([`dashboard/adddistrict/` + id])
  //   }
    
//   Active(element){
//     this.clientService.Activation(element).
//     then( responseAds => { this.tries = responseAds;
//       this.Clients()
//   });
// }
  Filter(value){
    if(value.status != undefined){
    this.spinner.show()
      this.clientService.GetFilter(value).
      then( responsedistrictfilter => { this.districts = responsedistrictfilter.data;
         this.dataSource = new MatTableDataSource(responsedistrictfilter.data);
         this.dataSource.paginator = this.paginator;
         setTimeout(() => {
          this.spinner.hide();
        }, this.districts);
      });
    }else{
      this.toastr.error("nothing to search for")
    }
 }
 action(){
   this.status = undefined;
   this.Clients()
 }
}
