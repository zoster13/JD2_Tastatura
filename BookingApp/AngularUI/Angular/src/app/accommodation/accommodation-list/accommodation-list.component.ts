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
    localStorage.setItem('updateAccommodation', JSON.stringify({ id: this.temp.Id, 
                    name: this.temp.Name,
                    description : this.temp.Description, 
                    address: this.temp.Address, 
                    avaragegrade: this.temp.AverageGrade, 
                    longitude: this.temp.Longitude,
                    latitude: this.temp.Latitude, 
                    imageUrl: this.temp.ImageURL,
                    approved: this.temp.Approved, 
                    place: this.temp.Place.Id, 
                    accommtype: this.temp.AccommodationType.Id,
                    owner: this.temp.Owner.Id}));
  }
}