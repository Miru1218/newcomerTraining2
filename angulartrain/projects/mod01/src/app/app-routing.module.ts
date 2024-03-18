import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfumeComponent } from './perfume/perfume.component';
import { ReactiveFormsCrudComponent } from './reactive-forms-crud/reactive-forms-crud.component';

const routes: Routes = [
  { path: 'perfume', component: PerfumeComponent },
  { path: 'reactive-forms-crud', component: ReactiveFormsCrudComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
