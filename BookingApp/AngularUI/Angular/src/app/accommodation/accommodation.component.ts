import { Component, OnInit } from '@angular/core';

import {AccommodationService} from '../services/accommodation.service';

import {Accommodation} from '../models/Accommodation';


@Component({
  selector: 'accomm',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css'],
})

export class AccommodationComponent implements OnInit {

  accommodation: Accommodation[];

  constructor(private accommodationService:AccommodationService) {

  }

  getAccommodation() : void {
    this.accommodationService.getAccommodations().then(accommodation => this.accommodation = accommodation);
  }

  ngOnInit() : void {
    this.getAccommodation();
  }

}