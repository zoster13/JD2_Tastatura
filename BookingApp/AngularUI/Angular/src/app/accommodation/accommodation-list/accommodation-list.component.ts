import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { Router } from '@angular/router';
import {AccommodationService} from '../../services/accommodation.service';
import {Accommodation} from '../../models/Accommodation';

@Component({
  selector: 'accomm-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.css'],
})

export class AccommodationListComponent implements OnInit {

  accommodations: Accommodation[];
  top: number;

  constructor(private accommodationService:AccommodationService,
  private router: Router,
  private cdr: ChangeDetectorRef) {
    this.top = 500;
  }

  getAccommodation() : void {
    this.accommodationService.getAccommodations()
      .then(accommodations => this.accommodations = accommodations);
  }

  ngOnInit() : void {
    this.getAccommodation();
  }

  getTop() : string {
    return this.top + "px";
  }

  ngAfterViewInit() {
    this.top += 200;
    this.cdr.detectChanges();
  }
}