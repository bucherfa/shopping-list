import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddItemComponent } from './views/add-item/add-item.component';
import { OverviewListComponent } from './views/overview-list/overview-list.component';
import { PreferencesComponent } from './views/preferences/preferences.component';

const routes: Routes = [
  { path: '', component: AddItemComponent },
  { path: 'overview', component: OverviewListComponent },
  { path: 'preferences', component: PreferencesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
