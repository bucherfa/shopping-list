import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddItemComponent } from './add-item/add-item.component';

const routes: Routes = [
  { path: '', component: AddItemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
