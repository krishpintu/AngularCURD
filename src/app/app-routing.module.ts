import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent }  from './home/home.component';
import { EmployeeAddComponent }  from './employee/employee-add/employee-add.component';
import { EmployeeListComponent }  from './employee/employee-list/employee-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ng-curd', component: HomeComponent },
  { path: 'addemployee', component: EmployeeAddComponent },
  { path: 'editemployee/:id', component: EmployeeAddComponent },
  { path: 'employees', component: EmployeeListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
