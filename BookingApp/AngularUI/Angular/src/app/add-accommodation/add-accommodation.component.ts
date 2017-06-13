import { Component, OnInit } from '@angular/core';
import { Place } from '../models/Place';
import { Room } from '../models/Room';
import {AccommodationType} from '../models/AccommodationType';
import {Accommodation} from '../models/Accommodation';
import {AppUser} from '../models/AppUser';
import {NgForm} from '@angular/forms';

import {PlacesService} from '../services/places.service';
import {AccommodationTypesService} from '../services/accommodation-types.service';
import {AccommodationService} from '../services/accommodation.service';

@Component({
  selector: 'add-accomm',
  templateUrl: './add-accommodation.component.html',
  styleUrls: ['./add-accommodation.component.css'],
})

export class AddAccommodationComponent implements OnInit {

  places: Place[];
  accommTypes: AccommodationType [];
  users: AppUser [];
  rooms: Room [];
  accommodation: Accommodation;

  constructor(private placesService:PlacesService,
  private accommTypeService: AccommodationTypesService,
  private accomService: AccommodationService
  ) 
  {
    this.rooms = [];
    this.accommodation = new Accommodation();
    this.accommodation.rooms = [];
  }

  ngOnInit(): void {
    this.getPlaces();
    this.getAccommTypes();
  }

  getPlaces() : void {
    this.placesService.getPlaces()
      .then(places => this.places = places);
  }

  getAccommTypes() : void {
    this.accommTypeService.getAccommodationTypes()
      .then(accommTypes => this.accommTypes = accommTypes);
  }

  onSubmitAccomm(accomm: Accommodation, form: NgForm) {
      this.accomService.create(accomm);
    }

    onSubmitRoom(room: Room, form: NgForm) {
      this.rooms.push(room);
      this.accommodation.rooms.push(room);
      form.reset();
    }
}