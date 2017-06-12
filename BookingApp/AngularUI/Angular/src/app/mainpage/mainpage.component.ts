import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location }                 from '@angular/common';

import {LogIn} from '../models/Log-in';

@Component({
  selector: 'main-page',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css'],
})

export class MainpageComponent {
    isLoggedIn: boolean;

    constructor(private location: Location, public router: Router) {}

    logOut(){
        this.router.navigate(["/login"]);
    }
}