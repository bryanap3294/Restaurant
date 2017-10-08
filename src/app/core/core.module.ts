import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';
import {AuthService} from '../auth/auth.service';
import {DataStorageService} from '../shared/data-storage.service';
import { OrdenService } from '../model/orden/orden.service';
import { PlatoService } from '../model/orden/plato/plato.service';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    AuthService,
    OrdenService,
    PlatoService,
    DataStorageService,
  ]
})
export class CoreModule{

}
