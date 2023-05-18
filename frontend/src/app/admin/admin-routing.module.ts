import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductComponent } from './pages/product/product.component';
import { UnitComponent } from './pages/unit/unit.component';
import { ArrivComponent } from './pages/arriv/arriv.component';
import { OutComponent } from './pages/out/out.component';
import { ReportComponent } from './pages/report/report.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'product', component: ProductComponent },
      { path: 'unit', component: UnitComponent },
      { path: 'arriv', component: ArrivComponent },
      { path: 'out', component: OutComponent },
      { path: 'report', component: ReportComponent },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
