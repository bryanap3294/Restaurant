import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Response } from '@angular/http';

import { NgForm } from '@angular/forms';
import { PlatoService } from '../../../model/orden/plato/plato.service';
import { Plato } from '../../../model/orden/plato/plato.model';
import { DataStorageService } from '../../../shared/data-storage.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Plato;
  platos: Plato[];

  constructor(private platoService: PlatoService, private dataStorageService: DataStorageService,
              private authService: AuthService) { }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      this.dataStorageService.getPlatos();
      this.platos = this.platoService.getPlatos();
      this.subscription = this.platoService.platosChanged
        .subscribe(
        (platos: Plato[]) => {
          this.platos = platos;
        }
        );
    }


    this.subscription = this.platoService.startedEditing
      .subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.platoService.getPlato(index);
        this.slForm.setValue({
          name: this.editedItem.nombrePlato,
          amount: this.editedItem.precio
        })
      }
      );
  }

  onEditItem(index: number) {
    this.platoService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newPlato = new Plato(value.name, value.amount);
    if (this.editMode) {
      this.platoService.updatePlato(this.editedItemIndex, newPlato);
    } else {
      this.platoService.addPlato(newPlato);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset()
    this.editMode = false;
  }

  onDelete() {
    this.platoService.deletePlato(this.editedItemIndex);
    this.onClear();
  }

  onSave() {
    this.dataStorageService.savePlatos()
      .subscribe(
      (response: Response) => {
        console.log(response);
      }
      );
  }

}
