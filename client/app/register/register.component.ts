import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService,CustomerService } from '../_services/index';
//import {Customer} from '../_models/index';
//import {CustomerComponent} from '../customer/index';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
   
       
})
export class RegisterComponent {
    model: any = {};
    loading = false;
    roles: any =[ {role : 'User'},{role : 'Admin'},{role : 'Customer'},{role :'Doctor'} ];
    route : string;
   constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
       ) {}

        



    register() {
         this.loading = true;
       
         this.model.isAdmin = false;
         
        
       if(this.model.userRole == 'Admin'){
              
             this.model.isAdmin = true;
             this.route = '/admin';

       }else {
             this.model.isAdmin = false;
             this.route = '/login';
         } 
            this.userService.create(this.model)
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
