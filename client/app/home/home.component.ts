import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',

})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    isAdmin: boolean;
    editedIndex: Number;
    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.isAdmin = this.currentUser.isAdmin;
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    onSelect(document: any, i: Number) {

        this.editedIndex = i;
    }

    deleteUser(_id: string) {

        this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
}