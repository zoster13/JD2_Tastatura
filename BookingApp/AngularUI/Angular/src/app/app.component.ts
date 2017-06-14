import { Component } from '@angular/core';
import {OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {CountriesService} from './services/countries.service';
import {AppUsersService} from './services/appuser.service';
import {Country} from './models/Country';
import {LogIn} from './models/Log-in';
import {AppUser} from './models/AppUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Booking App';
  countries : Country[];
  isLoggedIn: boolean;
  appusers : AppUser[];

  constructor(private countriesService:CountriesService,
              private appusersService:AppUsersService) {

  }

  onSubmit(login: LogIn, form: NgForm) {
    this.isLoggedIn = true;
    form.reset();
  }

  logOut() {
    this.isLoggedIn = false;
  }

  getCountries() : void {
    this.countriesService.getCountries().then(countries => this.countries= countries);
  }

  getAppUsers() : void {
    this.appusersService.getAppUsers().then(appusers => this.appusers = appusers);
  }

  ngOnInit() : void {
    this.getCountries();
    this.getAppUsers();
  }
}
