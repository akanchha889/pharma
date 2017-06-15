import { HttpModule, Http, Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { InventoryService, AuthenticationService } from '../_services/index';
import { Inventory } from '../_models/index';

@Component({
  moduleId: module.id,

  selector: 'inventory',
  templateUrl: 'inventory.component.html',
  providers: [InventoryService, HttpModule]
})

export class InventoryComponent implements OnInit {
  inventories: Inventory[] = [];
  currentUser: Inventory;
  returnUrl: string;
  editedIndex: Number;
  route : string;


  constructor(private router: Router,
    private inventoryService: InventoryService,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadAllInventories();
  }
  onSelect(document: any, i: Number) {

    this.editedIndex = i;
  }
  editDoctor(inventory: Inventory) {
    
    this.route = '/inventories';
    this.inventoryService.update(inventory).subscribe(() => { this.loadAllInventories();
     this.router.navigate([this.route]);
   });
  }

  deleteDoctor(_id: string) {
    this.inventoryService.delete(_id).subscribe(() => { this.loadAllInventories() });
     this.router.navigate(['/inventories']);
  }

  private loadAllInventories() {
    this.inventoryService.getAll().subscribe(inventories => { this.inventories = inventories; });


  }



}