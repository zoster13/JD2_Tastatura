import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { RegionsService } from '../../services/regions.service';
import { PlacesService } from '../../services/places.service';
import 'rxjs/add/operator/switchMap';
import {Region} from '../../models/Region';
import {Place} from '../../models/Place';

@Component({
  selector: 'places-form',
  templateUrl: './places-form.component.html',
  styleUrls: ['./places-form.component.css'],
})

export class PlacesFormComponent {

    regions: Region[];
    place: Place;

    uriParts: string [];
    isUpdate: boolean;
    temp: any;

    constructor(private placesService: PlacesService,
                private regionsService: RegionsService,
                private router: Router,
                private routeActive: ActivatedRoute,
                private location: Location) {

        this.place = new Place();
        this.place.Region = new Region();
        this.place.Name = '';
      }

  ngOnInit(): void {
    this.getRegions();

    this.uriParts =  this.router.url.split('/');

    if(this.uriParts[this.uriParts.length - 2] === 'update'){
        this.routeActive.params
        .switchMap((params: Params) => this.placesService.getPlace(+params['id']))
        .subscribe(place => this.place = place);

        this.isUpdate = true;
    }
    else{
      this.isUpdate = false;

      this.place.Name = '';
    }
  }

  getRegions() : void {
    this.regionsService.getRegions().then(region => this.regions = region);
  }

  onSubmit(place: any, form: NgForm):void{

    if(place.Name == "" || place.Name == undefined ||
      place.Region == "" || place.Region == undefined) {

        alert("All fields must be filled!");
      }
      else {

      this.place.Name = place.Name;
      this.place.Region = new Region();
      this.place.Region.Id = place.Region;

      if(!this.isUpdate){
          this.placesService.create(this.place);
          form.resetForm();
      }
      else{
          this.placesService.update(this.place);
      }
    }
  }
}