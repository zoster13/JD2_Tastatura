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
import {RoomsService} from '../services/rooms.service';

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
  place: number;

  constructor(private placesService:PlacesService,
  private accommTypeService: AccommodationTypesService,
  private accomService: AccommodationService,
  private roomsService: RoomsService
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

  onSubmitAccomm(accomm: any, form: NgForm) {
      this.accommodation.name = accomm.Name;
      this.accommodation.description = accomm.Description;  
      this.accommodation.address = accomm.Address;
      this.accommodation.longitude = accomm.Longitude;
      this.accommodation.latitude = accomm.Latitude;
      this.accommodation.place = new Place();
      this.accommodation.place.id = accomm.Place;
      this.accommodation.accommodationType = new AccommodationType();
      this.accommodation.accommodationType.id = accomm.AccommodationType;
      this.accommodation.rooms = this.rooms;

      debugger
      this.accomService.create(this.accommodation);
      
    }

    onSubmitRoom(room: Room, form: NgForm) {
      this.rooms.push(room);
      this.accommodation.rooms.push(room);
      debugger
      form.reset();
    }
}