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

    uriParts: string [];
    isUpdate: boolean;
    temp: any;

    constructor(
      private accommService: AccommodationService,
      private roomsService: RoomsService,
      private router: Router,
      private routeActive: ActivatedRoute,
      private location: Location) {

        this.room = new Room();
        this.room.bedCount = 0;
        this.room.roomNumber = 0;
        this.room.pricePerNight = 0;
        this.room.description = '';
        this.room.accommodation = new Accommodation();
        this.room.roomReservationss = [];
      }

  ngOnInit(): void {
    this.getAccommodation();

    this.uriParts =  this.router.url.split('/');
      
      if(this.uriParts[this.uriParts.length - 2] === 'update'){
        this.routeActive.params
        .switchMap((params: Params) => this.roomsService.getRoom(+params['id']))
        .subscribe(room => this.room = room);

        this.isUpdate = true;
      
    }
    else{
      this.isUpdate = false;

      this.room = new Room();
      this.room.bedCount = 0;
      this.room.roomNumber = 0;
      this.room.pricePerNight = 0;
      this.room.description = '';
      this.room.accommodation = new Accommodation();
      this.room.roomReservationss = [];
    }
  }

  getAccommodation() : void {
    this.accommService.getAllAccommodations().then(accomm => this.accommodation = accomm);
  }

  onSubmit(room: any, form: NgForm):void{
      this.room.roomNumber = room.RoomNumber;
      this.room.bedCount = room.BedCount;
      this.room.description = room.Description;
      this.room.pricePerNight = room.PricePerNight;
      this.room.accommodation = new Accommodation();
      this.room.accommodation.id = room.Accommodation;

      if(!this.isUpdate){
          this.roomsService.create(this.room);
      }
      else{
          this.roomsService.update(this.room);
      }

      form.resetForm();

      this.router.navigate(["mainpage/rooms/roomlist/1"]);
  }
}