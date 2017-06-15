import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Country } from '../../models/Country';
import {NgForm} from '@angular/forms';

import {CountriesService} from '../../services/countries.service';

@Component({
  selector: 'country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.css'],
})

export class CountryFormComponent implements OnInit {

  country: Country;
  uriParts: string [];
  isUpdate: boolean;
  temp: any;

  constructor(private countriesService: CountriesService,private router: Router) {
      this.country = new Country();
      this.country.name = '';
      this.country.code = 0;
  }

  ngOnInit(): void {
    this.uriParts =  this.router.url.split('/');

    if(this.uriParts[this.uriParts.length - 1] === 'update'){
      this.isUpdate = true;
      
      this.temp = JSON.parse(localStorage.getItem('updateCountry'));
      this.country.id = this.temp.id;
      this.country.name = this.temp.name;
      this.country.code = this.temp.code;
    }
    else{
      this.isUpdate = false;

      this.country = new Country();
      this.country.name = '';
      this.country.code = 0;
    }
  }

  onSubmit(country: any, form: NgForm) {
    this.country = new Country();
    this.country.name = country.Name;
    this.country.code = country.Code;

    if(!this.isUpdate){
        this.countriesService.create(this.country);
    }
    else{
        this.countriesService.update(this.country);
    }
    form.resetForm();
    }
}