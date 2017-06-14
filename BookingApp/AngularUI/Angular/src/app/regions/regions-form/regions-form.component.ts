import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { RegionsService } from '../../services/regions.service';
import { CountriesService } from '../../services/countries.service';
import 'rxjs/add/operator/switchMap';
import {Region} from '../../models/Region';
import {Country} from '../../models/Country';

@Component({
  selector: 'regions-form',
  templateUrl: './regions-form.component.html',
  styleUrls: ['./regions-form.component.css'],
})

export class RegionsFormComponent {

    countries: Country[];
    region: Region;

    constructor(
      private countryService: CountriesService,
      private regionsService: RegionsService,
      private router: Router,
      private location: Location) {

        this.region = new Region();
        this.region.country = new Country();
      }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries() : void {
    this.countryService.getCountries().then(countries => this.countries = countries);
  }

  onSubmit(region: any, form: NgForm):void{
      this.region.name = region.Name;
      this.region.country.id = region.Country;

      this.regionsService.create(this.region);
      form.resetForm();
  }
}