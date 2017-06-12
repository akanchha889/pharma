import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../app.config';
import { Customer } from '../_models/index';
//import {User}  from '../_models/index';


@Injectable()
export class CustomerService {
   // private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http, private config: AppConfig) { }

   getAll() {
        return this.http.get(this.config.apiUrl + '/customer', this.jwt()).map((response: Response) => response.json());
   }


 
    // private helper methods

    private jwt() {
        
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
           alert('jwt()' + currentUser);
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
              alert('headers' + headers);
            return new RequestOptions({ headers: headers });
        }
    }
}