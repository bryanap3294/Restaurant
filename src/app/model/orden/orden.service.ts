import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Orden} from './orden.model'
import {Plato} from '../orden//plato/plato.model';

@Injectable()
export class OrdenService{
  ordenChanged = new Subject<Orden[]>();

  private ordenes: Orden[] = [
    new Orden('Orden 1',
    23,
    [
      new Plato('plato1',1)
    ]),
    new Orden('Orden 2',
    23,
    [
      new Plato('plato2',2)
    ])
  ];

  constructor(){

  }

  getordenes(){
    return this.ordenes.slice();
  }

  getOrden(index: number) {
    return this.ordenes[index];
  }

  addOrden(orden: Orden){
    this.ordenes.push(orden);
    this.ordenChanged.next(this.ordenes.slice());
  }

  updateOrden(index: number, newOrden: Orden){
    this.ordenes[index] = newOrden;
    this.ordenChanged.next(this.ordenes.slice());
  }

  deleteOrden(index: number){
    this.ordenes.splice(index, 1);
    this.ordenChanged.next(this.ordenes.slice());
  }

  setOrdenes(ordenes: Orden[]){
    this.ordenes = ordenes;
    this.ordenChanged.next(this.ordenes.slice());
  }
}
