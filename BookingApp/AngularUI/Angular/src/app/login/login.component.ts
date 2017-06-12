import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { Location }                 from '@angular/common';

import {LogIn} from '../models/Log-in';

@Component({
  selector: 'log-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
    isLoggedIn: boolean;

    constructor(private location: Location, public router: Router) {}

  onSubmit(login: LogIn, form: NgForm) {
    this.isLoggedIn = true;
    form.reset();
    this.router.navigate(['/mainpage']);
  }
}