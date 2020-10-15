import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddItemComponent } from './add-item/add-item.component';
import {OverviewListComponent} from './overview-list/overview-list.component';

const routes: Routes = [
  { path: '', component: AddItemComponent },
  { path: 'overview', component: OverviewListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
