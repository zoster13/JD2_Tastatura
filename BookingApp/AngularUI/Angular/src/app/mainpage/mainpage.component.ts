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

    role: string;
    currentuser: string;

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
        if(this.isLoggedIn()){
            this.role = JSON.parse(localStorage.getItem('currentUser'))['role'];
            this.currentuser = JSON.parse(localStorage.getItem('currentUser'))['username'];
        }
    }
}