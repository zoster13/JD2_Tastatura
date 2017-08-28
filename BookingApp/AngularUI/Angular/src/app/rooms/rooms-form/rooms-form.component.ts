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
        this.room.BedCount = 0;
        this.room.RoomNumber = 0;
        this.room.PricePerNight = 0;
        this.room.Description = '';
        this.room.Accommodation = new Accommodation();
        //this.room.RoomReservationss = [];
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
      this.room.BedCount = 0;
      this.room.RoomNumber = 0;
      this.room.PricePerNight = 0;
      this.room.Description = '';
      this.room.Accommodation = new Accommodation();
      //this.room.RoomReservationss = [];
    }
  }

  getAccommodation() : void {
    this.accommService.getAllAccommodations().then(accomm => this.accommodation = accomm);
  }

  onSubmit(room: any, form: NgForm):void{

    if(room.RoomNumber == "" || room.RoomNumber == undefined ||
      room.BedCount == "" || room.BedCount == undefined ||
      room.Description == "" || room.Description == undefined ||
      room.PricePerNight == "" || room.PricePerNight == undefined ||
      room.Accommodation == "" || room.Accommodation == undefined) {

        alert("All fields must be filled.");
      } 
      else {
        this.room.RoomNumber = room.RoomNumber;
        this.room.BedCount = room.BedCount;
        this.room.Description = room.Description;
        this.room.PricePerNight = room.PricePerNight;
        this.room.Accommodation = new Accommodation();
        this.room.Accommodation.Id = room.Accommodation;

        if(!this.isUpdate){
          this.roomsService.create(this.room);
          form.resetForm();
        }
        else{
            this.roomsService.update(this.room);
        }
      }
  }
}