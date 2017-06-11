import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import { RoomsComponent } from './rooms/rooms.component';

import {CountriesService} from './services/countries.service';
import {AccommodationService} from './services/accommodation.service';
import {RoomsService} from './services/rooms.service';

const Routes = [
  {path: "accommodation", component: AccommodationComponent},
  {path: "accommdetails/:id", component: AccommodationDetailsComponent},
  {path: "rooms/:id", component: RoomsComponent},
  {path: '', redirectTo: "/accommodation", pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    AccommodationComponent,
    AccommodationDetailsComponent,
    RoomsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [CountriesService, 
  AccommodationService,
  RoomsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
