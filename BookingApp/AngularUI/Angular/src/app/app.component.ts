import { Component } from '@angular/core';
import {OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {CountriesService} from './services/countries.service';
import {Country} from './models/Country';
import {LogIn} from './models/Log-in';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Booking App';
  countries : Country[];
  isLoggedIn: boolean;

  constructor(private countriesService:CountriesService) {

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

  ngOnInit() : void {
    this.getCountries();
  }
}
