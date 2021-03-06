import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { OrdenComponent } from './model/orden/orden.component';
import { PlatoComponent } from './model/orden/plato/plato.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdenComponent,
    PlatoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
