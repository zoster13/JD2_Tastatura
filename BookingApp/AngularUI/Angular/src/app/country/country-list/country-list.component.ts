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

   update(countryId: number){
    this.country = new Country();
    for(var i = 0; i < this.countries.length; i++){
      this.temp = this.countries[i];
      if(this.temp.Id == countryId){
          break;
      }
    }
    localStorage.setItem('updateCountry', JSON.stringify({ id: this.temp.Id, 
                    name: this.temp.Name,
                    code : this.temp.Code}));
  }

}