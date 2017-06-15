import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location }                 from '@angular/common';

import {LogIn} from '../models/Log-in';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'main-page',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css'],
})

export class MainpageComponent implements OnInit {

    currentUser = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private location: Location, 
                public router: Router,
                private authenticationService: AuthenticationService) {

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

    ngOnInit() : void {
        
    }
}