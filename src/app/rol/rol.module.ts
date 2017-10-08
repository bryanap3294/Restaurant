import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RolRoutingModule } from './rol-routing.module';
import { CashierComponent } from './cashier/cashier.component';
import { ManagerComponent } from './manager/manager.component';
import { ChefComponent } from './chef/chef.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CashierComponent,
    ManagerComponent,
    ChefComponent,
  ],
  imports: [
    CommonModule,
    RolRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
  ]
})
export class RolModule {

}
