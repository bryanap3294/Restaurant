import {Plato} from './plato.model';
import {Subject} from 'rxjs/Subject';

export class PlatoService {
  platosChanged = new Subject<Plato[]>();
  startedEditing = new Subject<number>();
  private platos: Plato[] = [
    // new Plato('arros con pollo', 5),
    // new Plato('papa a la huanacaina', 10),
  ];

  getPlatos(){
    return this.platos.slice();
  }

  getPlato(index: number){
    return this.platos[index];
  }

  addPlato(plato: Plato){
    this.platos.push(plato);
    this.platosChanged.next(this.platos.slice());
  }

  addPlatos(platos: Plato[]){
    // for(let ingredient of ingredients){
    //   this.addIngredient(ingredient);
    // }
    this.platos.push(...platos);
    this.platosChanged.next(this.platos.slice());
  }

  updatePlato(index: number, newPlato: Plato){
    this.platos[index] = newPlato;
    this.platosChanged.next(this.platos.slice());
  }

  deletePlato(index: number) {
    this.platos.splice(index, 1);
    this.platosChanged.next(this.platos.slice());
  }

  setPlatos(platos: Plato[]){
     this.platos = platos;
     this.platosChanged.next(this.platos.slice());
  }

}
