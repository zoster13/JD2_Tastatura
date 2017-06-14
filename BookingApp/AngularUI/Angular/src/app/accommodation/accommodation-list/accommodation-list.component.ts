import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AccommodationService} from '../../services/accommodation.service';
import {Accommodation} from '../../models/Accommodation';

@Component({
  selector: 'accomm',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.css'],
})

export class AccommodationListComponent implements OnInit {

  accommodations: Accommodation[];

  constructor(private accommodationService:AccommodationService,
  private router: Router) {
    
  }

  getAccommodation() : void {
    this.accommodationService.getAccommodations()
      .then(accommodations => this.accommodations = accommodations);
  }

  ngOnInit() : void {
    this.getAccommodation();
  }

}