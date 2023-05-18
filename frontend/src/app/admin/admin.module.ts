import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './pages/product/product.component';
import { UnitComponent } from './pages/unit/unit.component';
import { ArrivComponent } from './pages/arriv/arriv.component';
import { OutComponent } from './pages/out/out.component';
import { ReportComponent } from './pages/report/report.component';


@NgModule({
  declarations: [
    AdminComponent,
    NavbarComponent,
    DashboardComponent,
    ProductComponent,
    UnitComponent,
    ArrivComponent,
    OutComponent,
    ReportComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
