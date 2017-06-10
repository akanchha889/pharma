import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../app.config';
import { Customer } from '../_models/index';
//import {User}  from '../_models/index';


@Injectable()
export class CustomerService {
    constructor(private http: Http, private config: AppConfig, private customer : Customer) { }

  /* getAll() {
        return this.http.get(this.config.apiUrl + '/customer', this.jwt()).map((response: Response) => response.json());
   }


    create(user: User) {
        alert('create' + this.config.apiUrl + '/customer/register'+ user._id + '' + user.password);
        this.customer.password = user.password;
        this.customer.customerName = user.username;
        this.customer.custFirstName = user.firstName;
        this.customer.custLastName = user.lastName;

       // return this.http.post(this.config.apiUrl + '/customer/register', this.customer , this.jwt());
    }*/

   /* update(customer: Customer) {
             alert('update');
        return this.http.put(this.config.apiUrl + '/customer/' + customer._id, customer, this.jwt());
    }

    delete(_id: string) {

              alert('delete');
        return this.http.delete(this.config.apiUrl + '/customer/' + _id, this.jwt());
    }*/

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        alert('jwt()' + currentUser);
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}