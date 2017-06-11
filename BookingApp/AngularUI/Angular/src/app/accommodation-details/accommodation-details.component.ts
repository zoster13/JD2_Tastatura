import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { AccommodationService } from '../services/accommodation.service';
import 'rxjs/add/operator/switchMap';

import {Accommodation} from '../models/Accommodation';

@Component({
  selector: 'accomm-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css'],
})

export class AccommodationDetailsComponent {

    accommodation: Accommodation;


    constructor(
  private accommodationService: AccommodationService,
  private route: ActivatedRoute,
  private location: Location
    ) {}

  ngOnInit(): void {
    this.route.params
    .switchMap((params: Params) => this.accommodationService.getAccommodation(+params['id']))
    .subscribe(accomm => this.accommodation = accomm);
  }

  goBack(): void {
    this.location.back();
  }
}