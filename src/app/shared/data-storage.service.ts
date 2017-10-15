import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {OrdenService} from '../model/orden/orden.service';
import {Orden} from '../model/orden/orden.model';
import {Plato} from '../model/orden/plato/plato.model';
import 'rxjs/add/operator/map';
import {AuthService} from '../auth/auth.service';
import { PlatoService } from '../model/orden/plato/plato.service';

@Injectable()
export class DataStorageService {
  constructor(private http: Http,
              private ordenService: OrdenService,
              private platoService: PlatoService,
              private authService: AuthService){

              }

  storeOrdenes() {
      const token = this.authService.getToken();
      // let nombreCliente : String = '';
      // nombreCliente = this.ordenService.getOrden(0).nombreCliente;
      return this.http.put('https://restaurant-9ea70.firebaseio.com/orden/.json?auth='+token, this.ordenService
      // return this.http.put('https://restaurant-9ea70.firebaseio.com/orden/'+nombreCliente+'/.json?auth='+token, this.ordenService
      .getOrdenes());

  }

  saveOrdenes() {
      const token = this.authService.getToken();

      return this.http.post('https://restaurant-9ea70.firebaseio.com/orden.json?auth='+token, this.ordenService
    .getOrdenes());
  }

  savePlatos() {
      const token = this.authService.getToken();

      return this.http.put('https://restaurant-9ea70.firebaseio.com/plato.json?auth='+token, this.platoService
    .getPlatos());
  }

  getPlatos(){

    const token = this.authService.getToken();

    this.http.get('https://restaurant-9ea70.firebaseio.com/plato.json?auth='+token)
    .map(
      (response: Response) => {
        const platos: Plato[] = response.json();
        // for (let plato of platos){
        //   if(!plato['platos']){
        //     console.log(plato);
        //     plato['platos'] = [];
        //   }
        // }
        return platos;
      }
    )
    .subscribe(
      (platos: Plato[]) => {
        this.platoService.setPlatos(platos);
      }
    );
  }

  getOrdenes(){

    const token = this.authService.getToken();

    this.http.get('https://restaurant-9ea70.firebaseio.com/orden.json?auth='+token)
    .map(
      (response: Response) => {
        const ordenes: Orden[] = response.json();
        for (let orden of ordenes){
          if(!orden['platos']){
            console.log(orden);
            orden['platos'] = [];
          }
        }
        return ordenes;
      }
    )
    .subscribe(
      (ordenes: Orden[]) => {
        this.ordenService.setOrdenes(ordenes);
      }
    );
  }

}
