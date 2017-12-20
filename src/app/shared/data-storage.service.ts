import {Injectable} from '@angular/core';
import {Headers, Http, Response, RequestOptions, RequestOptionsArgs, RequestMethod} from '@angular/http';
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
    .getNewOrden());
  }

  postOrden(){
    // const hola = ", 'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJicnlhbmFwMzI5NEBnbWFpbC5jb20iLCJleHAiOjE1MTQwNzIzODh9.8ixpDGiI8K2zZNG5dHcYiGf1QIQ3vBf6J1qBFpfQPYEA1gpT103TVA092NjtuAbUHGq6ZbrRScPEWeEtdqC0_Q'";
    let headers = new Headers( { 'Content-Type': 'application/json' } );
    let requestArg: RequestOptionsArgs = { headers: headers, method: "POST" };
      return this.http.post('http://localhost:8080/api/orden',
      this.ordenService
    .getNewOrden(), requestArg);
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
        return platos;
      }
    )
    .subscribe(
      (platos: Plato[]) => {
        this.platoService.setPlatos(platos);
      }
    );
  }

  getOrdenessss(){

    const token = this.authService.getToken();

    this.http.get('http://localhost:8080/api/orden')
    .map(
      (response: Response) => {
        console.log("bryna");
        console.log(JSON.stringify(response));
        const ordenes: any[] = response.json();
        const res : Orden[] = <any[]>Object.values(ordenes);
        console.log("res:");
        console.log(res);
        return res;
      }
    )
    .subscribe(
                (ordenes: Orden[]) => {
                  console.log("aaa");
                  const val: Orden[] = <Orden[]>Object.values(ordenes);
                  console.log("val");
                  console.log(val);
                  this.ordenService.setOrdenes(val);
                }
    );
  }

  getOrdenes(){

    const token = this.authService.getToken();

    this.http.get('https://restaurant-9ea70.firebaseio.com/orden.json?auth='+token)
    .map(
      (response: Response) => {
        const ordenes: any[] = response.json();
        const res : Orden[] = <any[]>Object.values(ordenes);
        return res;
      }
    )
    .subscribe(
      (ordenes: Orden[]) => {
        const val: Orden[] = <Orden[]>Object.values(ordenes);
        console.log("val");
        console.log(val);
        this.ordenService.setOrdenes(val);
      }
    );
  }

}
