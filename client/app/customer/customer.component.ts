import { HttpModule, Http, Response } from '@angular/http';
import { Component ,OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService ,CustomerService,AuthenticationService} from '../_services/index';
 import { Customer } from '../_models/index';
import { User } from '../_models/index';

@Component({
     moduleId: module.id, 

    selector: 'customer',
    templateUrl: 'customer.component.html',
     providers:[CustomerService,HttpModule]
   })
   
export class CustomerComponent implements OnInit {
   customers: Customer[] = [];
     currentUser: Customer;
         returnUrl: string;

    constructor( private route: ActivatedRoute,
          private customerService : CustomerService ,
        ){
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
         this.loadAllCustomer();
    }
      
    deleteUser(_id: string) {
       // this.customerService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllCustomer() {
           this.customerService.getAll().subscribe(customers => { this.customers = customers; });
      
    }

}