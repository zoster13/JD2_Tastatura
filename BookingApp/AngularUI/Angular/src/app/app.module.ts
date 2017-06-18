import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AccommodationMainComponent } from './accommodation/accommodation-main/accommodation-main.component';
import { AccommodationDetailsComponent } from './accommodation/accommodation-details/accommodation-details.component';
import { RoomsFormComponent } from './rooms/rooms-form/rooms-form.component';
import { RoomsMainComponent } from './rooms/rooms-main/rooms-main.component';
import { RoomsListComponent } from './rooms/rooms-list/rooms-list.component';
import { LoginComponent } from './login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
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
import {RoomReservationsMainComponent} from './room-reservations/room-reservations-main/room-reservations-main.component';
import {RoomReservationsListComponent} from './room-reservations/room-reservations-list/room-reservations-list.component';
import {RoomReservationsFormComponent} from './room-reservations/room-reservations-form/room-reservations-form.component';
import {CommentsMainComponent} from './comments/comments-main/comments-main.component';
import {CommentsListComponent} from './comments/comments-list/comments-list.component';
import {CommentsFormComponent} from './comments/comments-form/comments-form.component';
import {NotificationsComponent} from './notifications/notifications.component';

import {CountriesService} from './services/countries.service';
import {AccommodationService} from './services/accommodation.service';
import {RoomsService} from './services/rooms.service';
import {CommentsService} from './services/comments.service';
import {PlacesService} from './services/places.service';
import {AccommodationTypesService} from './services/accommodation-types.service';
import {AuthenticationService} from './services/authentication.service';
import {AppUsersService} from './services/appuser.service';
import {RegionsService} from './services/regions.service';
import {RoomReservationsService} from './services/room-reservations.service';
import { NotificationService } from "./services/notifications.service";

//Maps
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';

import { AccommodationFilterPipe } from './search/search.component';

const ChildRoutesAccomm = [
   {path: "accommform", component: AccommodationFormComponent},
   {path: "accommlist", component: AccommodationListComponent},
   {path: "update/:id", component: AccommodationFormComponent},
   {path: "roomlist/:id", component: RoomsListComponent},
   {path: "details/:id", component: AccommodationDetailsComponent},
   {path: "reservationlist/:id", component: RoomReservationsListComponent},
   {path: "commentlist/:id", component: CommentsListComponent},
  ]

const ChildRoutesCountry = [
   {path: "countryform", component: CountryFormComponent},
   {path: "countrylist", component: CountryListComponent},
   {path: "update/:id", component: CountryFormComponent}
  ]

const ChildRoutesRooms = [
   {path: "roomform", component: RoomsFormComponent},
   {path: "roomlist", component: RoomsListComponent},
   {path: "update/:id", component: RoomsFormComponent}
  ]

const ChildRoutesRegions = [
   {path: "regionlist", component: RegionsListComponent},
   {path: "regionform", component: RegionsFormComponent},
   {path: "update/:id", component: RegionsFormComponent}
  ]

const ChildRoutesPlaces = [
   {path: "placelist", component: PlacesListComponent},
   {path: "placeform", component: PlacesFormComponent},
   {path: "update/:id", component: PlacesFormComponent}
  ]

const ChildRoutesAccommTypes = [
   {path: "accommtypeslist", component: AccommodationTypesListComponent},
   {path: "accommtypesform", component: AccommodationTypesFormComponent},
   {path: "update/:id", component: AccommodationTypesFormComponent}
  ]

const ChildRoutesReservations = [
   {path: "reservationlist", component: RoomReservationsListComponent},
   {path: "reservationform", component: RoomReservationsFormComponent},
   {path: "update/:id", component: RoomReservationsFormComponent}
  ]

const ChildRoutesComments = [
   {path: "commentlist", component: CommentsListComponent},
   {path: "commentform", component: CommentsFormComponent},
   {path: "update/:id", component: CommentsFormComponent}
  ]

const ChildRoutesMain = [
   {path: "notifications", component: NotificationsComponent},
   {path: "map", component: MapComponent},
   {path: "accommodation", component: AccommodationMainComponent, children: ChildRoutesAccomm},
   {path: "country", component: CountryMainComponent, children: ChildRoutesCountry},
   {path: "rooms", component: RoomsMainComponent, children: ChildRoutesRooms},
   {path: "regions", component: RegionsMainComponent, children: ChildRoutesRegions},
   {path: "places", component: PlacesMainComponent, children: ChildRoutesPlaces},
   {path: "accommtypes", component: AccommodationTypesMainComponent, children: ChildRoutesAccommTypes},
   {path: "reservations", component: RoomReservationsMainComponent, children: ChildRoutesReservations},
   {path: "comments", component: CommentsMainComponent, children: ChildRoutesComments},
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
    MapComponent,
    AccommodationMainComponent,
    AccommodationDetailsComponent,
    LoginComponent,
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
    AccommodationTypesFormComponent,
    AccommodationFilterPipe,
    RoomReservationsMainComponent,
    RoomReservationsListComponent,
    RoomReservationsFormComponent,
    CommentsMainComponent,
    CommentsListComponent,
    CommentsFormComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Routes),
    FormsModule,
    HttpModule,
    //prilikom import-a mape prosleđujemo Google API key koji dobijamo preko google konzole
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDnihJyw_34z5S1KZXp90pfTGAqhFszNJk'}),
    JsonpModule
  ],
  providers: [CountriesService, 
    AccommodationService,
    RoomsService,
    CommentsService,
    PlacesService,
    AccommodationTypesService,
    AuthenticationService,
    AppUsersService,
    RegionsService,
    RoomReservationsService,
    NotificationService
    ],
  bootstrap: [
    AppComponent
    ]
})
export class AppModule { }
