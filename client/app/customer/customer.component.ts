import { Component ,OnInit} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

//import { AlertService ,CustomerService} from '../_services/index';
//import { Customer } from '../_models/index';
//import { User } from '../_models/index';

@Component({
    selector: 'customerInfo',
    moduleId: module.id,
    templateUrl: 'customer.component.html',
   })
 
export class CustomerComponent implements OnInit {
   
    constructor(){

    }

    ngOnInit() {
        this.loadAllCustomer();
    }
      
    deleteUser(_id: string) {
       // this.customerService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }


    private loadAllCustomer() {
      // this.customerService.getAll().subscribe(customers => { this.customer = customers; });
    }

}