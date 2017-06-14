import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import { RoomsComponent } from './rooms-form/rooms-form.component';
import { LoginComponent } from './login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import {CommentsComponent} from './comments/comments.component';
import {AccommodationFormComponent} from './accommodation-form/accommodation-form.component';
import {AccommodationListComponent} from './accommodation-list/accommodation-list.component';

import {CountriesService} from './services/countries.service';
import {AccommodationService} from './services/accommodation.service';
import {RoomsService} from './services/rooms.service';
import {CommentsService} from './services/comments.service';
import {PlacesService} from './services/places.service';
import {AccommodationTypesService} from './services/accommodation-types.service';
import {AuthenticationService} from './services/authentication.service';
import {AppUsersService} from './services/appuser.service';

const ChildRoutesAccomm = [
   {path: "accommform", component: AccommodationFormComponent},
   {path: "accommlist", component: AccommodationListComponent},
   {path: "rooms/:id", component: RoomsComponent},
   {path: "comments/:id", component: CommentsComponent},
   {path: "accommdetails/:id", component: AccommodationDetailsComponent}
  ]

const ChildRoutesMain = [
   {path: "accommodation", component: AccommodationComponent, children: ChildRoutesAccomm},
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
    AccommodationComponent,
    AccommodationDetailsComponent,
    RoomsComponent,
    LoginComponent,
    CommentsComponent,
    MainpageComponent, 
    AccommodationFormComponent,
    AccommodationListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Routes),
    FormsModule,
    HttpModule
  ],
  providers: [CountriesService, 
    AccommodationService,
    RoomsService,
    CommentsService,
    PlacesService,
    AccommodationTypesService,
    AuthenticationService,
    AppUsersService
    ],
  bootstrap: [
    AppComponent
    ]
})
export class AppModule { }
