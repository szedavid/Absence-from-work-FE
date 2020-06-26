import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AbsenceTableComponent} from './absence-table/absence-table.component';
import {WelcomeComponent} from './welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'list', component: AbsenceTableComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
