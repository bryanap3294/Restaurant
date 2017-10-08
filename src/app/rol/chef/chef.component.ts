import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import {NgForm} from '@angular/forms';
import {Orden} from '../../model/orden/orden.model';
import {OrdenService} from '../../model/orden/orden.service';
import { Plato } from '../../model/orden/plato/plato.model';


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
  //private subscription: Subscription;

  constructor(private ordenService: OrdenService) { }

  ngOnInit() {
    this.ordenes = this.ordenService.getOrdenes();
    this.subscription =  this.ordenService.ordenChanged
    .subscribe(
      (ordenes: Orden[]) =>{
        this.ordenes = ordenes;
      }
    );

    this.subscription = this.ordenService.startedEditing
    .subscribe(
      (index:number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.ordenService.getOrden(index);
        this.slForm.setValue({
            name: this.editedItem.nombreCliente,
            amount: this.editedItem.monto
        })
      }
    );
  }

  onEditItem(index: number){
    this.ordenService.startedEditing.next(index);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newOrden = new Orden(value.name, value.amount, [new Plato('arros', 23)]);
    if (this.editMode){
      this.ordenService.updateOrden(this.editedItemIndex, newOrden);
    } else{
      this.ordenService.addOrden(newOrden);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.slForm.reset()
    this.editMode = false;
  }

  onDelete(){
    this.ordenService.deleteOrden(this.editedItemIndex);
    this.onClear();
  }

}
