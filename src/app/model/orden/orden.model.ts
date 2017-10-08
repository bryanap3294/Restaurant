import { Plato } from './plato/plato.model';export class Orden{

  constructor(public nombreCliente: string,
    public monto: number, public platos: Plato[]){

  }
}
