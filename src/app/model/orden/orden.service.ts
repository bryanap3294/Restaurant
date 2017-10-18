import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Orden } from './orden.model'
import { Plato } from '../orden//plato/plato.model';

@Injectable()
export class OrdenService {
  ordenChanged = new Subject<Orden[]>();
  startedEditing = new Subject<number>();

  private ordenes: Orden[] = []
  private orden: Orden; //[] = [
  // new Orden('Orden 4',
  // 23,
  // [
  //   new Plato('plato1',1)
  // ]),
  // new Orden('Orden 2',
  // 23,
  // [
  //   new Plato('plato2',2)
  // ])
  //];

  constructor() {

  }

  getOrdenes() {
    return this.ordenes.slice();
  }

  getOrden(index: number) {
    return this.ordenes[index];
  }

  addOrden(orden: Orden) {
    this.orden = new Orden(orden.nombreCliente, orden.monto, [new Plato('plato1', 1)]);
  }

  addNewOrden(orden: Orden) {
    this.ordenes.push(orden);// https://www.w3schools.com/jsref/jsref_push.asp
    this.ordenChanged.next(this.ordenes.slice());
  }

  updateOrden(index: number, newOrden: Orden) {
    this.ordenes[index] = newOrden;
    this.ordenChanged.next(this.ordenes.slice());
  }

  deleteOrden(index: number) {
    this.ordenes.splice(index, 1);//https://www.w3schools.com/jsref/jsref_splice.asp
    this.ordenChanged.next(this.ordenes.slice());//https://www.w3schools.com/jsref/jsref_slice_array.asp
  }

  getNewOrden() {
    return this.orden;
  }

  setOrdenes(ordenes: Orden[]) {
    this.ordenes = ordenes;
    this.ordenChanged.next(this.ordenes.slice());
  }
}
