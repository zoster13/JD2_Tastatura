import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AccommodationMainComponent } from './accommodation/accommodation-main/accommodation-main.component';
import { AccommodationDetailsComponent } from './accommodation/accommodation-details/accommodation-details.component';
import { RoomsFormComponent } from './rooms/rooms-form/rooms-form.component';
import { RoomsMainComponent } from './rooms/rooms-main/rooms-main.component';
import { RoomsListComponent } from './rooms/rooms-list/rooms-list.component';
import { LoginComponent } from './login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import {CommentsComponent} from './comments/comments.component';
import {AccommodationFormComponent} from './accommodation/accommodation-form/accommodation-form.component';
import {AccommodationListComponent} from './accommodation/accommodation-list/accommodation-list.component';
import {RegionsFormComponent} from './regions/regions-form/regions-form.component';
import {RegionsListComponent} from './regions/regions-list/regions-list.component';
import {RegionsMainComponent} from './regions/regions-main/regions-main.component';
import {PlacesListComponent} from './places/places-list/places-list.component';
import {PlacesMainComponent} from './places/places-main/places-main.component';
import {PlacesFormComponent} from './places/places-form/places-form.component';
import {AccommodationTypesListComponent} from './accommodation-types/accommodation-types-list/accommodation-types-list.component';
import {AccommodationTypesMainComponent} from './accommodation-types/accommodation-types-main/accommodation-types-main.component';
import {AccommodationTypesFormComponent} from './accommodation-types/accommodation-types-form/accommodation-types-form.component';
import {CountryFormComponent} from './country/country-form/country-form.component';
import {CountryMainComponent} from './country/country-main/country-main.component';
import {CountryListComponent} from './country/country-list/country-list.component';

import {CountriesService} from './services/countries.service';
import {AccommodationService} from './services/accommodation.service';
import {RoomsService} from './services/rooms.service';
import {CommentsService} from './services/comments.service';
import {PlacesService} from './services/places.service';
import {AccommodationTypesService} from './services/accommodation-types.service';
import {AuthenticationService} from './services/authentication.service';
import {AppUsersService} from './services/appuser.service';
import {RegionsService} from './services/regions.service';

//Maps
import { MapComponent } from './map/map.component';
//import { AgmCoreModule } from '@agm/core';


const ChildRoutesAccomm = [
   {path: "accommform", component: AccommodationFormComponent},
   {path: "accommlist", component: AccommodationListComponent},
   {path: "comments/:id", component: CommentsComponent},
   {path: "update", component: AccommodationFormComponent}
  ]

const ChildRoutesCountry = [
   {path: "countryform", component: CountryFormComponent},
   {path: "countrylist", component: CountryListComponent}
  ]

const ChildRoutesRooms = [
   {path: "roomform", component: RoomsFormComponent},
   {path: "roomlist", component: RoomsListComponent}
  ]

const ChildRoutesRegions = [
   {path: "regionlist", component: RegionsListComponent},
   {path: "regionform", component: RegionsFormComponent}
  ]

const ChildRoutesPlaces = [
   {path: "placelist", component: PlacesListComponent},
   {path: "placeform", component: PlacesFormComponent}
  ]

const ChildRoutesAccommTypes = [
   {path: "accommtypeslist", component: AccommodationTypesListComponent},
   {path: "accommtypesform", component: AccommodationTypesFormComponent}
  ]

const ChildRoutesMain = [
   {path: "accommodation", component: AccommodationMainComponent, children: ChildRoutesAccomm},
   {path: "country", component: CountryMainComponent, children: ChildRoutesCountry},
   {path: "rooms", component: RoomsMainComponent, children: ChildRoutesRooms},
   {path: "regions", component: RegionsMainComponent, children: ChildRoutesRegions},
   {path: "places", component: PlacesMainComponent, children: ChildRoutesPlaces},
   {path: "accommtypes", component: AccommodationTypesMainComponent, children: ChildRoutesAccommTypes},
   {path: "login", component: LoginComponent}
  ]

const Routes = [
  {path: "login", component: LoginComponent},
  {path: "mainpage", component: MainpageComponent, children: ChildRoutesMain},
  {path: '', redirectTo: "/mainpage", pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    //MapComponent,
    AccommodationMainComponent,
    AccommodationDetailsComponent,
    LoginComponent,
    CommentsComponent,
    MainpageComponent, 
    AccommodationFormComponent,
    AccommodationListComponent,
    RoomsFormComponent,
    RoomsMainComponent,
    RoomsListComponent,
    RegionsMainComponent,
    RegionsListComponent,
    CountryFormComponent,
    CountryMainComponent,
    CountryListComponent,
    RegionsFormComponent,
    PlacesListComponent,
    PlacesMainComponent,
    PlacesFormComponent,
    AccommodationTypesMainComponent,
    AccommodationTypesListComponent,
    AccommodationTypesFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Routes),
    FormsModule,
    HttpModule,
    //prilikom import-a mape prosleđujemo Google API key koji dobijamo preko google konzole
    //AgmCoreModule.forRoot({apiKey: 'AIzaSyDnihJyw_34z5S1KZXp90pfTGAqhFszNJk'})
  ],
  providers: [CountriesService, 
    AccommodationService,
    RoomsService,
    CommentsService,
    PlacesService,
    AccommodationTypesService,
    AuthenticationService,
    AppUsersService,
    RegionsService
    ],
  bootstrap: [
    AppComponent
    ]
})
export class AppModule { }
