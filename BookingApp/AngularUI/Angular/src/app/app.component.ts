import { Component } from '@angular/core';
import {OnInit} from '@angular/core';
import {CountriesService} from './services/countries.service';
import {Country} from './models/Country';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Booking App';
  countries : Country[];

  constructor(private countriesService:CountriesService) {

  }

  getCountries() : void {
    this.countriesService.getCountries().then(countries => this.countries= countries);
  }

  ngOnInit() : void {
    this.getCountries();
  }
}
