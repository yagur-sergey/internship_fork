import { BrowserModule } from '@angular/platform-browser';

import { NgModule, APP_INITIALIZER } from '@angular/core';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { initializer } from './utils/app-init';
import { RealtyCreatingComponent } from './components/realty.creating/realty.creating.component';
import { RealtiesMyListComponent } from './components/realties.my.list/realties.my.list.component';
import { RealtyEditingComponent } from './components/realty.editing/realty.editing.component';
import { RealtyOverviewComponent } from './components/realty.overview/realty.overview.component';
import { RealtiesAllListComponent } from './components/realties.all.list/realties.all.list.component';

// import { AuthService } from './serivce/auth.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatTabsModule,
  MatToolbarModule,
  MatDividerModule,
  MatListModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule
 } from '@angular/material';

 import {MatGridListModule} from '@angular/material/grid-list';
 import {MatDialogModule} from '@angular/material/dialog';

 import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    RealtiesAllListComponent,
    RealtyCreatingComponent,
    RealtiesMyListComponent,
    RealtyEditingComponent,
    RealtyOverviewComponent,
    // AuthService,

  ],
  imports: [
    KeycloakAngularModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatTabsModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatSelectModule,

    MatGridListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    
    AngularYandexMapsModule.forRoot('94004118-bc46-4c2a-989d-5a622bc8bf64')
    
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
