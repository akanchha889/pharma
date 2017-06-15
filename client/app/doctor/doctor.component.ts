import { HttpModule, Http, Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DoctorService, AuthenticationService } from '../_services/index';
import { Doctor } from '../_models/index';

@Component({
  moduleId: module.id,

  selector: 'doctor',
  templateUrl: 'doctor.component.html',
  providers: [DoctorService, HttpModule]
})

export class DoctorComponent implements OnInit {
  doctors: Doctor[] = [];
  currentUser: Doctor;
  returnUrl: string;
  editedIndex: Number;
  route: string;


  constructor(private router: Router,
    private doctorService: DoctorService,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadAllDoctors();
  }
  onSelect(document: any, i: Number) {

    this.editedIndex = i;
  }
  editDoctor(doctor: Doctor) {

    this.route = '/doctors';
    this.doctorService.update(doctor).subscribe(() => {
      this.loadAllDoctors();
      this.router.navigate([this.route]);
    });
  }

  deleteDoctor(_id: string) {
    this.doctorService.delete(_id).subscribe(() => { this.loadAllDoctors() });
    this.router.navigate(['/doctors']);
  }

  private loadAllDoctors() {
    this.doctorService.getAll().subscribe(doctors => { this.doctors = doctors; });


  }



}