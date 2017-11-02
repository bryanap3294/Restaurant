import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { OrdenService } from '../../model/orden/orden.service';
import { Orden } from '../../model/orden/orden.model';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Orden;

  ordenes: Orden[];

  constructor(private ordenService: OrdenService,
    private authService: AuthService,
    private dataStorageService: DataStorageService) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.dataStorageService.getOrdenes();
      this.ordenes = this.ordenService.getOrdenes();
      this.subscription = this.ordenService.ordenChanged
        .subscribe(
        (ordenes: Orden[]) => {
          this.ordenes = ordenes;
        }
        );
    }
    this.subscription = this.ordenService.startedEditing
      .subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.ordenService.getOrden(index);
        this.slForm.setValue({
          name: this.editedItem.nombreCliente,
          monto: this.editedItem.monto,
          estado: this.editedItem.estado,
          platos: this.editedItem.platos
        })
      }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
