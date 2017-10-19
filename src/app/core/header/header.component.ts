import { Component } from '@angular/core';
import {Response} from '@angular/http';
import {DataStorageService} from '../../shared/data-storage.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector : 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  constructor( private dataStorageService: DataStorageService,
    private authService : AuthService){}

  isCollapsed = true;

  onSaveData(){
    // this.dataStorageService.storeOrdenes()

    this.dataStorageService.saveOrdenes()
    .subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
    // this.dataStorageService.savePlatos()
    // .subscribe(
    //   (response: Response) => {
    //     console.log(response);
    //   }
    // );
  }

  onFetchData(){
    this.dataStorageService.getOrdenes();
  }

  onLogout(){
    this.authService.logOut();
  }

}
