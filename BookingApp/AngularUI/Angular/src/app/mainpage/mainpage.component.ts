import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Location }                 from '@angular/common';

import {LogIn} from '../models/Log-in';
import {AuthenticationService} from '../services/authentication.service';
import {NotificationsComponent} from '../notifications/notifications.component';

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
                private _ngZone: NgZone,
                private authenticationService: AuthenticationService) {

    }

    logOut(){
        this.authenticationService.logout();
        this.role = "";
        this.currentuser = "";
        
        this.router.navigate(["mainpage"]);
    }

    logIn(){
        this.router.navigate(["mainpage/login"]);
    }

    isLoggedIn(): boolean {
        return this.authenticationService.isLoggedIn();
    }

    ngOnInit() : void {
        this.subscribeForLoggedIn();
    }

    private subscribeForLoggedIn () {
        this.authenticationService.loggedInEvent.subscribe(e => this.onLoggedIn());
  }

  public onLoggedIn() {
     this._ngZone.run(() => {  
            this.role = JSON.parse(localStorage.getItem('currentUser'))['role'];
            this.currentuser = JSON.parse(localStorage.getItem('currentUser'))['username'];
    });
  }

}