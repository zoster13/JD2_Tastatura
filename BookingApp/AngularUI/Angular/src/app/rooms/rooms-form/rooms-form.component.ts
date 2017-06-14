import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { RoomsService } from '../../services/rooms.service';
import { AccommodationService } from '../../services/accommodation.service';
import 'rxjs/add/operator/switchMap';
import {Room} from '../../models/Room';
import {Accommodation} from '../../models/Accommodation';

@Component({
  selector: 'rooms-form',
  templateUrl: './rooms-form.component.html',
  styleUrls: ['./rooms-form.component.css'],
})

export class RoomsFormComponent {

    accommodation: Accommodation[];
    room: Room;

    constructor(
      private accommService: AccommodationService,
      private roomsService: RoomsService,
      private router: Router,
      private location: Location) {

        this.room = new Room();
      }

  ngOnInit(): void {
    this.getAccommodation();
  }

  getAccommodation() : void {
    this.accommService.getAccommodations().then(accomm => this.accommodation = accomm);
    //debugger
  }

  onSubmit(room: any, form: NgForm):void{
      this.room.roomNumber = room.RoomNumber;
      this.room.bedCount = room.BedCount;
      this.room.description = room.Description;
      this.room.pricePerNight = room.PricePerNight;
      this.room.accommodation = new Accommodation();
      this.room.accommodation.id = room.Accommodation;

      this.roomsService.create(this.room);
      form.resetForm();
  }
}