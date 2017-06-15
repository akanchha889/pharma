import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../app.config';
import { Inventory } from '../_models/index';


@Injectable()
export class InventoryService {

    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + '/inventory', this.jwt()).map((response: Response) => response.json());
    }
    create(inventory: Inventory) {
        return this.http.post(this.config.apiUrl + '/inventory/register', inventory, this.jwt());
    }

    delete(_id: string) {
        return this.http.delete(this.config.apiUrl + '/inventory/' + _id, this.jwt());
    }

    update(inventory: Inventory) {
        return this.http.put(this.config.apiUrl + '/inventory/' + inventory._id, inventory, this.jwt());
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