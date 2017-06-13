import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import { RoomsComponent } from './rooms/rooms.component';
import { LoginComponent } from './login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import {CommentsComponent} from './comments/comments.component';

import {CountriesService} from './services/countries.service';
import {AccommodationService} from './services/accommodation.service';
import {RoomsService} from './services/rooms.service';
import {CommentsService} from './services/comments.service';

const ChildRoutes = [
   {path: "accommodation", component: AccommodationComponent},
   {path: "accommdetails/:id", component: AccommodationDetailsComponent},
   {path: "rooms/:id", component: RoomsComponent},
   {path: "comments/:id", component: CommentsComponent}
  ]

const Routes = [
  //{path: "mainpage/accommodation", component: AccommodationComponent},
  {path: "login", component: LoginComponent},
  {path: "mainpage", component: MainpageComponent, children: ChildRoutes},
  {path: '', redirectTo: "/login", pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    AccommodationComponent,
    AccommodationDetailsComponent,
    RoomsComponent,
    LoginComponent,
    CommentsComponent,
    MainpageComponent
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
  CommentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
