import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../app.config';
import { Doctor } from '../_models/index';


@Injectable()
export class DoctorService {

    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + '/doctor', this.jwt()).map((response: Response) => response.json());
    }
    create(doctor: Doctor) {
        return this.http.post(this.config.apiUrl + '/doctor/register', doctor, this.jwt());
    }

    delete(_id: string) {
        return this.http.delete(this.config.apiUrl + '/doctor/' + _id, this.jwt());
    }

    update(doctor: Doctor) {
        return this.http.put(this.config.apiUrl + '/doctor/' + doctor._id, doctor, this.jwt());
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