import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import { RolRoutingModule } from './rol-routing.module';
import { CashierComponent } from './cashier/cashier.component';
import { ManagerComponent } from './manager/manager.component';
import { ChefComponent } from './chef/chef.component';

@NgModule({
  declarations: [
    CashierComponent,
    ManagerComponent,
    ChefComponent,
  ],
  imports: [
    FormsModule,
    RolRoutingModule
  ]
})
export class RolModule {

}
