import { Component, OnInit } from '@angular/core';

import {AccommodationService} from '../services/accommodation.service';

import {Accommodation} from '../models/Accommodation';


@Component({
  selector: 'accomm',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css'],
})

export class AccommodationComponent implements OnInit {

  accommodations: Accommodation[];

  constructor(private accommodationService:AccommodationService) {

  }

  getAccommodation() : void {
    this.accommodationService.getAccommodations().then(accommodations => this.accommodations = accommodations);
    //debugger
  }

  ngOnInit() : void {
    this.getAccommodation();
  }

}