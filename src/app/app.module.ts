import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BarComponent } from './components/bar/bar.component';
import { AddItemComponent } from './views/add-item/add-item.component';
import { FormsModule } from '@angular/forms';
import { OverviewListComponent } from './views/overview-list/overview-list.component';
import { PreferencesComponent } from './views/preferences/preferences.component';

@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    AddItemComponent,
    OverviewListComponent,
    PreferencesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
