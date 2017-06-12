import { Component, OnInit } from '@angular/core';
import {Country} from '../models/Country';
import { CountriesService} from '../services/countries.service';

@Component({
  selector: 'country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
})

export class CountryComponent implements OnInit {

  countries: Country[];

  constructor(private countriesService:CountriesService) {

  }

  getCountries() : void {
    this.countriesService.getCountries().then(countries => this.countries = countries);
    debugger
  }

  ngOnInit() : void {
    this.getCountries();
  }

}