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

    uriParts: string [];
    isUpdate: boolean;
    temp: any;

    constructor(private countryService: CountriesService,
                private regionsService: RegionsService,
                private router: Router,
                private routeActive: ActivatedRoute,
                private location: Location) {

        this.region = new Region();
        this.region.Country = new Country();
        this.region.Name = '';
      }

  ngOnInit(): void {
    this.getCountries();

    this.uriParts =  this.router.url.split('/');

    if(this.uriParts[this.uriParts.length - 2] === 'update'){
        this.routeActive.params
        .switchMap((params: Params) => this.regionsService.getRegion(+params['id']))
        .subscribe(region => this.region = region);

      this.isUpdate = true;

    }
    else{
      this.isUpdate = false;

      this.region.Name = '';
    }
  }

  getCountries() : void {
    this.countryService.getAllCountries().then(countries => this.countries = countries);
  }

  onSubmit(region: any, form: NgForm):void{
      
      if(region.Name == "" || region.Name == undefined ||
        region.Country == "" || region.Country == undefined) {
          alert("All fields must be filled!");
        }
      else {
        this.region.Name = region.Name;
        this.region.Country = new Country();
        this.region.Country.Id = region.Country;

        if(!this.isUpdate){
          this.regionsService.create(this.region);
          form.resetForm();
        }
        else{
          this.regionsService.update(this.region);
        }
      }
  }
}