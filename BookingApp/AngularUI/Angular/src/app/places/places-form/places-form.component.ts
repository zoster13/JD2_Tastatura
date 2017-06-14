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

    constructor(
      private placesService: PlacesService,
      private regionsService: RegionsService,
      private router: Router,
      private location: Location) {

        this.place = new Place();
        this.place.region = new Region();
      }

  ngOnInit(): void {
    this.getRegions();
  }

  getRegions() : void {
    this.regionsService.getRegions().then(region => this.regions = region);
  }

  onSubmit(place: any, form: NgForm):void{
      this.place.name = place.Name;
      this.place.region.id = place.Region;

      this.placesService.create(this.place);
      form.resetForm();
  }
}