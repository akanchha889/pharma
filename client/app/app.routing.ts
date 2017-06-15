﻿import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import {AdminComponent} from './admin/index';
import {CustomerComponent} from './customer/index';
import {CustomerListComponent} from './customer/index';
import {DoctorComponent} from './doctor/index';
import {DoctorListComponent} from './doctor/index';
import {InventoryComponent} from './inventory/index';
import {InventoryListComponent} from './inventory/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'admin',component:AdminComponent},
    { path: 'customers',component:CustomerComponent, canActivate: [AuthGuard]},
    {path : 'addCustomer',component:CustomerListComponent},
    { path: 'doctors',component:DoctorComponent, canActivate: [AuthGuard]},
    {path : 'addDoctor',component:DoctorListComponent},
    { path: 'inventories',component:InventoryComponent, canActivate: [AuthGuard]},
    {path : 'addInventory',component:InventoryListComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
 
export const routing = RouterModule.forRoot(appRoutes);