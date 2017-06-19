import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CountriesService} from '../../services/countries.service';
import {Country} from '../../models/Country';

@Component({
  selector: 'country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
})

export class CountryListComponent implements OnInit {

  countries: Country[];
  country: Country;
  temp: any;

  constructor(private countryService:CountriesService,
  private router: Router) {
    
  }

  getCountries() : void {
    this.countryService.getCountries()
      .then(countries => this.countries = countries);
  }

  ngOnInit() : void {
    this.getCountries();
  }

  delete(id: number){
    this.countryService.delete(id);
    window.location.reload();
  }
}