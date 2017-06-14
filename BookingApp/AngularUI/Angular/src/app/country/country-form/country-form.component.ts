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

  constructor(private countriesService: CountriesService,private router: Router) {

  }

  ngOnInit(): void {

  }

  onSubmit(country: any, form: NgForm) {
    this.country = new Country();
    this.country.name = country.Name;
    this.country.code = country.Code;
      this.countriesService.create(this.country);
      form.resetForm();
    }
}