import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PerfumeComponent } from './perfume/perfume.component';
import { ReactiveFormsCrudComponent } from './reactive-forms-crud/reactive-forms-crud.component';

@NgModule({
  declarations: [
    AppComponent,
    PerfumeComponent,
    ReactiveFormsCrudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
