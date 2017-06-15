import { HttpModule, Http, Response } from '@angular/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, DoctorService, AuthenticationService } from '../_services/index';
import { Doctor } from '../_models/index';


@Component({
    moduleId: module.id,

    selector: 'doctor',
    templateUrl: 'doctor-list.html',
    providers: [DoctorService, HttpModule]
})

export class DoctorListComponent {
    doctor: Doctor[] = [];
    currentUser: Doctor;
    model: any = {};
    loading = false;
    route: string;
    constructor(
        private doctorSevice: DoctorService,
        private alertService: AlertService,
        private router: Router,
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    }
    addDoctor() {
        this.loading = true;
        this.route = '/doctors';
        this.doctorSevice.create(this.model)
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