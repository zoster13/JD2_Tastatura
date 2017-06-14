import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AccommodationMainComponent } from './accommodation/accommodation-main/accommodation-main.component';
import { AccommodationDetailsComponent } from './accommodation/accommodation-details/accommodation-details.component';
import { RoomsFormComponent } from './rooms-form/rooms-form.component';
import { LoginComponent } from './login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import {CommentsComponent} from './comments/comments.component';
import {AccommodationFormComponent} from './accommodation/accommodation-form/accommodation-form.component';
import {AccommodationListComponent} from './accommodation/accommodation-list/accommodation-list.component';

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
   {path: "comments/:id", component: CommentsComponent},
   {path: "accommdetails/:id", component: AccommodationDetailsComponent}
  ]

const ChildRoutesMain = [
   {path: "accommodation", component: AccommodationMainComponent, children: ChildRoutesAccomm},
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
    AccommodationMainComponent,
    AccommodationDetailsComponent,
    LoginComponent,
    CommentsComponent,
    MainpageComponent, 
    AccommodationFormComponent,
    AccommodationListComponent,
    RoomsFormComponent
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
