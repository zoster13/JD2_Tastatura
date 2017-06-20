import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { Location }                 from '@angular/common';

import {LogIn} from '../models/Log-in';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'log-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {

    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/mainpage']);
                    window.location.reload();
                    
                } else {
                    alert('Username or password is incorrect');
                    this.router.navigate(['mainpage/login']);
                    this.loading = false;
                }
            });
    }
}