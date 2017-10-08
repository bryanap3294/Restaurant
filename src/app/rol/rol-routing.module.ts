import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashierComponent } from './cashier/cashier.component';
import { ManagerComponent } from './manager/manager.component';
import { ChefComponent } from './chef/chef.component';
import { MaintenanceComponent } from './chef/maintenance/maintenance.component';

const rolRoutes: Routes = [

  { path: 'cashier', component: CashierComponent },
  { path: 'manager', component: ManagerComponent },
  { path: 'chef', component: ChefComponent },
  { path: 'chef/maintenance', component: MaintenanceComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(rolRoutes)
  ],
  exports: [RouterModule]
})
export class RolRoutingModule { }
