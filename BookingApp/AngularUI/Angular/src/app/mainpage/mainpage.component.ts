import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location }                 from '@angular/common';

import {LogIn} from '../models/Log-in';
import {AuthenticationService} from '../services/authentication.service';

import {MapInfo} from "../map/map-info.model"

@Component({
  selector: 'main-page',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css'],
})

export class MainpageComponent {

      mapInfo: MapInfo;

    constructor(private location: Location, 
                public router: Router,
                private authenticationService: AuthenticationService) {
        
        this.mapInfo = new MapInfo(45.242268, 19.842954,
          "assets/ftn.png",
          "Jugodrvo" , "" , "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");
    }

    logOut(){
        this.authenticationService.logout();
    }

    logIn(){
        this.router.navigate(["mainpage/login"]);
    }

    isLoggedIn(): boolean {
        return this.authenticationService.isLoggedIn();
    }
}