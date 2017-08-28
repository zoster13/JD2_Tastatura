import { Component, OnInit, NgZone } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
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
  numeration: any[] = [];
  i: number = 0;
  countrycount: number = 0;

  constructor(private countryService:CountriesService,
              private router: Router,
              private _ngZone: NgZone,
              private routeActive: ActivatedRoute) {
                
  }

  getAllCountries() : void {
    this.countryService.getAllCountries()
      .then(countries => {
        this.countrycount = countries.length;

      if(this.countrycount%5 == 0){
          for(this.i = 0;this.i < Math.floor(this.countrycount/5); this.i++){
            this.numeration[this.i] = this.i + 1;
          }
      }
      else{
          for(this.i = 0; this.i <  Math.floor(this.countrycount/5) + 1; this.i++){
            this.numeration[this.i] = this.i + 1;
          }
      }
    });


  }

  ngOnInit() : void {
    this.getAllCountries();
    this.routeActive.params
        .switchMap((params: Params) => this.countryService.getCountries(((+params['id'])-1)*5))
        .subscribe(country => this.countries = country);

    this.subscribeForCountryEvent();
  }

  delete(id: number){
    this.countryService.delete(id)
    .then( x => { this.countryService.getAllCountries().then(x => this.countries = x);});
  }

  private subscribeForCountryEvent () {
    this.countryService.countryEvent.subscribe(e => this.onCountryEvent(e));
  }

  public onCountryEvent(message : string) {
    alert(message);              
  }
}