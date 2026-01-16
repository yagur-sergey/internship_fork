import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RealtiesAllListComponent } from './components/realties.all.list/realties.all.list.component';
import { RealtyCreatingComponent } from './components/realty.creating/realty.creating.component';
import { RealtiesMyListComponent } from './components/realties.my.list/realties.my.list.component';
import { RealtyEditingComponent } from './components/realty.editing/realty.editing.component';
import { RealtyOverviewComponent } from './components/realty.overview/realty.overview.component';

const routes: Routes = [
  {
    path: 'realties',
    component: RealtiesAllListComponent,
    data: { title: 'RealEstate' }
  },
  {
    path: 'realties/my',
    component: RealtiesMyListComponent,
    data: { title: 'RealEstate' }
  },
  {
    path: 'realties/new',
    component: RealtyCreatingComponent,
    data: { title: 'RealEstate' }
  },
  {
    path: 'realties/editing/:id',
    component: RealtyEditingComponent,
    data: { title: 'RealEstate' }
  },
  {
    path: 'realties/:id',
    component: RealtyOverviewComponent,
    data: { title: 'Overview' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
