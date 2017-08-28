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
        this.reservation.StartDate = new Date();
        this.reservation.EndDate = new Date();
        this.reservation.Room = new Room();
        this.reservation.User = new AppUser();
        
    }

  ngOnInit(): void {
    this.getRooms();
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
        this.reservation.StartDate = new Date();
      this.reservation.StartDate.setFullYear(0);
      this.reservation.StartDate.setMonth(0);
      this.reservation.StartDate.setDate(0);
      this.reservation.EndDate = new Date();
      this.reservation.EndDate.setFullYear(0);
      this.reservation.EndDate.setMonth(0);
      this.reservation.EndDate.setDate(0);
        this.reservation.Room = new Room();
        this.reservation.User = new AppUser();
    }
  }

  getRooms() : void {
    this.roomsService.getAllRooms().then(rooms => this.rooms = rooms);
  }

  onSubmit(reservation: any, form: NgForm):void{
      this.reservation.StartDate = new Date();
      this.reservation.StartDate.setFullYear(reservation.Syear);
      this.reservation.StartDate.setMonth(reservation.Smonth);
      this.reservation.StartDate.setDate(reservation.Sday);

      this.reservation.EndDate = new Date();
      this.reservation.EndDate.setFullYear(reservation.Eyear);
      this.reservation.EndDate.setMonth(reservation.Emonth);
      this.reservation.EndDate.setDate(reservation.Eday);

      this.reservation.Timestamp = new Date();
      this.reservation.Room = new Room();
      this.reservation.Room.Id = reservation.Room;
      this.reservation.User = new AppUser();
        this.reservation.User.Id = 1;

      if(!this.isUpdate){
          this.reservationService.create(this.reservation);
      }
      else{
          this.reservationService.update(this.reservation);
      }

      form.resetForm();

      this.router.navigate(["mainpage/reservations/reservationlist"]);
  }
}