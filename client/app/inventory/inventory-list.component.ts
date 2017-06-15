import { HttpModule, Http, Response } from '@angular/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService ,InventoryService,AuthenticationService} from '../_services/index';
 import { Inventory } from '../_models/index';


@Component({
     moduleId: module.id, 

    selector: 'inventory-list',
    templateUrl: 'inventory-list.html',
     providers:[InventoryService,HttpModule]
   })
   
export class InventoryListComponent  {
   currentUser: Inventory;
   model: any = {};
   loading = false;
   route : string;
    constructor( 
          private inventorySevice : InventoryService ,
           private alertService: AlertService,
           private router: Router,
    ){
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    addInventory() {
         this.loading = true;
         this.route = '/inventories';
           this.inventorySevice.create(this.model)
            .subscribe(

                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate([this.route]);
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }

}