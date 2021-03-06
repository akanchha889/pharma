import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../app.config';
import { Customer } from '../_models/index';


@Injectable()
export class CustomerService {

    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + '/customer', this.jwt()).map((response: Response) => response.json());
    }
    create(customer: Customer) {
        return this.http.post(this.config.apiUrl + '/customer/register', customer, this.jwt());
    }

    delete(_id: string) {
        return this.http.delete(this.config.apiUrl + '/customer/' + _id, this.jwt());
    }

    update(customer: Customer) {
        return this.http.put(this.config.apiUrl + '/customer/' + customer._id, customer, this.jwt());
    }

    // private helper methods

    private jwt() {

        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}