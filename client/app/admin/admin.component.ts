import {Component} from '@angular/core';
//import { Router, ActivatedRoute } from '@angular/router';
//import { NgGridModule } from 'angular2-grid';
import { User } from '../_models/index';
import { UserService } from '../_services/index';


@Component({
     moduleId: module.id,
     templateUrl : 'admin.component.html',
   

})

export class AdminComponent  {
    //currentUser: User;
    //users: User[] = [];
   // isAdmin : boolean;
    
    constructor(private userService: UserService) {
      // alert('' +this.users);
    }
   

}