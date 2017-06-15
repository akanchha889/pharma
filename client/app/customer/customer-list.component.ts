import { HttpModule, Http, Response } from '@angular/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, CustomerService, AuthenticationService } from '../_services/index';
import { Customer } from '../_models/index';


@Component({
    moduleId: module.id,

    selector: 'customer',
    templateUrl: 'customer-list.html',
    providers: [CustomerService, HttpModule]
})

export class CustomerListComponent {
    customers: Customer[] = [];
    currentUser: Customer;
    model: any = {};
    loading = false;
    route: string;
    constructor(
        private customerService: CustomerService,
        private alertService: AlertService,
        private router: Router,
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    addCustomer() {
        this.loading = true;
        this.route = '/customers';
        this.customerService.create(this.model)
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