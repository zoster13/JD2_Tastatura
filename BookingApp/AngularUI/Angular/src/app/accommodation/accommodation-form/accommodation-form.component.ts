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
  selector: 'accomm-form',
  templateUrl: './accommodation-form.component.html',
  styleUrls: ['./accommodation-form.component.css'],
})

export class AccommodationFormComponent implements OnInit {

  places: Place[];
  accommTypes: AccommodationType [];
  users: AppUser [];
  accommodation: Accommodation;
  place: number;
  owners: AppUser[]

  uriParts: string [];
  isUpdate: boolean;
  temp: any;
;
  constructor(private placesService:PlacesService,
  private accommTypeService: AccommodationTypesService,
  private accomService: AccommodationService,
  private roomsService: RoomsService,
  private appUsersService: AppUsersService,
  private router: Router
  ) 
  {
    this.accommodation = new Accommodation();
    this.accommodation.rooms = [];
    this.accommodation.owner = new AppUser();
    this.accommodation.name = '';
    this.accommodation.description = '';
    this.accommodation.address = '';
    this.accommodation.longitude = 0;
    this.accommodation.latitude = 0;
    this.owners = [];
  }

  ngOnInit(): void {
    this.getPlaces();
    this.getAccommTypes();
    this.getAccommOwners();

    this.uriParts =  this.router.url.split('/');

    if(this.uriParts[this.uriParts.length - 1] === 'update'){
      this.isUpdate = true;
      
      this.temp = JSON.parse(localStorage.getItem('updateAccommodation'));
      this.accommodation.name = this.temp.name;
      this.accommodation.description = this.temp.description;
      this.accommodation.address = this.temp.address;
      this.accommodation.longitude = this.temp.longitude;
      this.accommodation.latitude = this.temp.latitude;
    }
    else{
      this.isUpdate = false;

      this.accommodation.name = '';
      this.accommodation.description = '';
      this.accommodation.address = '';
      this.accommodation.longitude = 0;
      this.accommodation.latitude = 0;
    }
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
      this.accommodation.owner.id = accomm.Owner;

      this.accomService.create(this.accommodation);
      form.resetForm();

      this.router.navigate(["mainpage/accommodation/accommlist"]);
    }
}