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

  county: Country;

  constructor(private countriesService: CountriesService,private router: Router) {

  }

  ngOnInit(): void {

  }

  onSubmit(country: any, form: NgForm) {
      debugger
      this.countriesService.create(this.county);
      form.resetForm();

      this.router.navigate(["mainpage"]);
    }
}