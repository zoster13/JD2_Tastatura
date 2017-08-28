import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
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

  constructor(private countriesService: CountriesService,
              private router: Router,
              private routeActive: ActivatedRoute) {
                
      this.country = new Country();
      this.country.Name = '';
      this.country.Code = 0;
  }

  ngOnInit(): void {
    this.uriParts =  this.router.url.split('/');

    if(this.uriParts[this.uriParts.length - 2] === 'update'){
        this.routeActive.params
        .switchMap((params: Params) => this.countriesService.getCountry(+params['id']))
        .subscribe(country => this.country = country);

      this.isUpdate = true;
    }
    else{
      this.isUpdate = false;

      this.country = new Country();
      this.country.Name = '';
      this.country.Code = 0;
    }
  }

  onSubmit(country: any, form: NgForm) {
    
    if(country.Name == "" || country.Name == undefined ||
       country.Code == "" || country.Code == undefined) {

      alert("All fields must be filled!");
    }
    else {
      this.country.Name = country.Name;
      this.country.Code = country.Code;

      if(!this.isUpdate){
        this.countriesService.create(this.country);
        form.resetForm();
      }
      else{
        this.countriesService.update(this.country);
      }
    }
  }
}