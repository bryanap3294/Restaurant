import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Response } from '@angular/http';

import { NgForm } from '@angular/forms';
import { Orden } from '../../model/orden/orden.model';
import { OrdenService } from '../../model/orden/orden.service';
import { Plato } from '../../model/orden/plato/plato.model';
import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/data-storage.service';


@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})
export class ChefComponent implements OnInit, OnDestroy {
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

  onEditItem(index: number) {
    this.ordenService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    console.log(value);
    const newOrden = new Orden(value.name, value.monto, value.estado, value.platos);
    if (this.editMode) {
      this.ordenService.updateOrden(this.editedItemIndex, newOrden);
    } else {
      this.ordenService.addNewOrden(newOrden);
    }
    this.editMode = false;
    form.reset();
    this.dataStorageService.storeOrdenes()
      .subscribe(
      (response: Response) => {
        console.log(response);
      }
      );
  }

  onClear() {
    this.slForm.reset()
    this.editMode = false;
  }

  onDelete() {
    this.ordenService.deleteOrden(this.editedItemIndex);
    this.onClear();
  }

  onSave() {
    this.dataStorageService.storeOrdenes()
      .subscribe(
      (response: Response) => {
        console.log(response);
      }
      );
  }

}
