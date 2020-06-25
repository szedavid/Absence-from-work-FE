import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AbsenceTableComponent} from './absence-table/absence-table.component';


const routes: Routes = [
  { path: 'list', component: AbsenceTableComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
