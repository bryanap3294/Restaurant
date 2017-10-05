import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import {AuthModule} from './auth/auth.module';
import { ManagerComponent } from './rol/manager/manager.component';
import { ChefComponent } from './rol/chef/chef.component';
import { CashierComponent } from './rol/cashier/cashier.component';

@NgModule({
  declarations: [
    AppComponent,
    ManagerComponent,
    ChefComponent,
    CashierComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
