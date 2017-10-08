import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {OrdenService} from '../model/orden/orden.service';
import {Orden} from '../model/orden/orden.model';
import 'rxjs/add/operator/map';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(private http: Http,
              private ordenService: OrdenService,
              private authService: AuthService){

              }

  storeOrdenes() {
      const token = this.authService.getToken();

      return this.http.put('https://restaurant-9ea70.firebaseio.com/restaurant.json?auth='+token, this.ordenService
    .getordenes());
  }

  saveOrdenes() {
      const token = this.authService.getToken();

      return this.http.post('https://restaurant-9ea70.firebaseio.com/restaurant.json?auth='+token, this.ordenService
    .getordenes());
  }

  getOrdenes(){

    const token = this.authService.getToken();

    this.http.get('https://restaurant-9ea70.firebaseio.com/restaurant.json?auth='+token)
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
