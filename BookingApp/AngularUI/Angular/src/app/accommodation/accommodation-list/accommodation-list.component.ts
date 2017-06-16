import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {AccommodationService} from '../../services/accommodation.service';
import {Accommodation} from '../../models/Accommodation';

@Component({
  selector: 'accomm-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.css'],
})

export class AccommodationListComponent implements OnInit {

  accommodations: Accommodation[];
  accomm: Accommodation;
  temp: any;
  

  constructor(private accommodationService:AccommodationService,
  private router: Router,
  private location: Location) {
  }

  getAccommodations() : void {
    this.accommodationService.getAccommodations()
      .then(accommodations => this.accommodations = accommodations);
  }

  ngOnInit() : void {
    this.getAccommodations();
  }

  update(accommId: number){
    this.accomm = new Accommodation();
    for(var i = 0; i < this.accommodations.length; i++){
      this.temp = this.accommodations[i];
      if(this.temp.Id == accommId){
          break;
      }
    }
  }
}