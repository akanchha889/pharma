import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//import { NgGridModule } from 'angular2-grid';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AppConfig } from './app.config';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService,CustomerService,DoctorService,InventoryService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index'; 
import { RegisterComponent } from './register/index';
import {AdminComponent} from './admin/index';
import {CustomerComponent} from './customer/index';
import {CustomerListComponent} from './customer/index';
import {DoctorComponent} from './doctor/index';
import {DoctorListComponent} from './doctor/index';
import {InventoryComponent} from './inventory/index';
import {InventoryListComponent} from './inventory/index';
// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api/in-memory-web-api.module';
//import { InMemoryDataService }  from './in-memory-data.service';  



    
@NgModule({
    imports: [
        BrowserModule,    
        FormsModule,
        HttpModule,
        routing,
           
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AdminComponent,
        CustomerComponent,
        CustomerListComponent,
        DoctorComponent,
        DoctorListComponent,
        InventoryComponent,
        InventoryListComponent
    ],
    providers: [
        AppConfig,
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        CustomerService,
        DoctorService,
        InventoryService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }

