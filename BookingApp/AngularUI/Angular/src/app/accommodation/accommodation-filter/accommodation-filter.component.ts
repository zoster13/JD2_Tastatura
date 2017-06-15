import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Place } from '../../models/Place';
import { Room } from '../../models/Room';
import {AccommodationType} from '../../models/AccommodationType';
import {Accommodation} from '../../models/Accommodation';
import {AppUser} from '../../models/AppUser';
import {NgForm} from '@angular/forms';
import {PlacesService} from '../../services/places.service';
import {AccommodationTypesService} from '../../services/accommodation-types.service';
import {AccommodationService} from '../../services/accommodation.service';
import {RoomsService} from '../../services/rooms.service';
import {AppUsersService} from '../../services/appuser.service';

@Component({
  selector: 'accommodation-filter',
  templateUrl: './accommodation-filter.component.html',
  styleUrls: ['./accommodation-filter.component.css'],
})

export class AccommodationFilterComponent implements OnInit {

  places: Place[] = [];
  accommTypes: AccommodationType [] = [];
  owners: AppUser[] = [];

  constructor(private placesService:PlacesService,
            private accommTypeService: AccommodationTypesService,
            private appUsersService : AppUsersService,
            private router: Router) {

      }

  ngOnInit(): void {
    this.getPlaces();
    this.getAccommTypes();
    this.getAccommOwners();
  }

  getPlaces() : void {
    this.placesService.getPlaces()
      .then(places => this.places = places);
  }

  getAccommTypes() : void {
    this.accommTypeService.getAccommodationTypes()
      .then(accommTypes => this.accommTypes = accommTypes);
  }

  getAccommOwners() : void {
    this.appUsersService.getAppUsers()
      .then(owners => this.owners = owners);
  }

  onSubmitAccommFilter(accommFilter: any, form: NgForm) {
        if(accommFilter.name != "")
        {
            
        }
    }
}