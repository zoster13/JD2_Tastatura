import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { RoomsService } from '../../services/rooms.service';
import { RoomReservationsService } from '../../services/room-reservations.service';
import 'rxjs/add/operator/switchMap';
import {Room} from '../../models/Room';
import {AppUser} from '../../models/AppUser';
import {RoomReservations} from '../../models/RoomReservations';

@Component({
  selector: 'reservations-form',
  templateUrl: './room-reservations-form.component.html',
  styleUrls: ['./room-reservations-form.component.css'],
})

export class RoomReservationsFormComponent {

    reservation: RoomReservations;
    rooms: Room[];

    uriParts: string [] = [];
    isUpdate: boolean;
    temp: any;

    constructor(
      private reservationService: RoomReservationsService,
      private roomsService: RoomsService,
      private router: Router,
      private routeActive: ActivatedRoute,
      private location: Location) {

        this.reservation = new RoomReservations();
        this.reservation.startDate = new Date();
        this.reservation.endDate = new Date();
        this.reservation.room = new Room();
        this.reservation.user = new AppUser();
        
    }

  ngOnInit(): void {
    this.getRooms();
debugger
    this.uriParts =  this.router.url.split('/');
      
      if(this.uriParts[this.uriParts.length - 2] === 'update'){
        this.routeActive.params
        .switchMap((params: Params) => this.reservationService.getRoomReservation(+params['id']))
        .subscribe(reserv => this.reservation = reserv);

        this.isUpdate = true;
      
    }
    else{
      this.isUpdate = false;

        this.reservation = new RoomReservations();
        this.reservation.startDate = new Date();
      this.reservation.startDate.setFullYear(0);
      this.reservation.startDate.setMonth(0);
      this.reservation.startDate.setDate(0);
      this.reservation.endDate = new Date();
      this.reservation.endDate.setFullYear(0);
      this.reservation.endDate.setMonth(0);
      this.reservation.endDate.setDate(0);
        this.reservation.room = new Room();
        this.reservation.user = new AppUser();
    }
  }

  getRooms() : void {
    this.roomsService.getAllRooms().then(rooms => this.rooms = rooms);
  }

  onSubmit(reservation: any, form: NgForm):void{
      this.reservation.startDate = new Date();
      this.reservation.startDate.setFullYear(reservation.Syear);
      this.reservation.startDate.setMonth(reservation.Smonth);
      this.reservation.startDate.setDate(reservation.Sday);

      this.reservation.endDate = new Date();
      this.reservation.endDate.setFullYear(reservation.Eyear);
      this.reservation.endDate.setMonth(reservation.Emonth);
      this.reservation.endDate.setDate(reservation.Eday);

      this.reservation.timestamp = new Date();
      this.reservation.room = new Room();
      this.reservation.room.id = reservation.Room;
      this.reservation.user = new AppUser();
        this.reservation.user.id = 1;

      if(!this.isUpdate){
          debugger
          this.reservationService.create(this.reservation);
      }
      else{
          this.reservationService.update(this.reservation);
      }

      form.resetForm();

      this.router.navigate(["mainpage/reservations/reservationlist"]);
  }
}