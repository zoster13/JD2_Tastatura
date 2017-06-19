import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {RoomReservationsService} from '../../services/room-reservations.service';
import {RoomReservations} from '../../models/RoomReservations';
import {AppUser} from '../../models/AppUser';

@Component({
  selector: 'reservations-list',
  templateUrl: './room-reservations-list.component.html',
  styleUrls: ['./room-reservations-list.component.css'],
})

export class RoomReservationsListComponent implements OnInit {

  roomReservations: RoomReservations[] = [];

  uriParts: string[];
  caption: string;
  jsonParts: string;

  constructor(private roomreservationsService:RoomReservationsService,
  private router: Router,
  private route: ActivatedRoute) {
    
  }

  getAllRoomReservations() : void {
    this.roomreservationsService.getAllRoomReservations()
      .then(roomsres => this.roomReservations = roomsres);
  }

  ngOnInit() : void {

    this.uriParts =  this.router.url.split('/');

    if(this.uriParts[this.uriParts.length - 2] === 'reservationlist'){

        this.route.params
        .switchMap((params: Params) => this.roomreservationsService.getRoomReservations(+params['id']))
        .subscribe(roomsres => {this.roomReservations = roomsres;});

        this.caption = "Rooms reservations of selected room:";
    }
     else{
       this.caption = "";
       this.getAllRoomReservations();
     }
  }

  finishBooking(roomres: RoomReservations){
    roomres.user = new AppUser();
    roomres.user.username = JSON.parse(localStorage.getItem('currentUser'))['username'];
    
    this.roomreservationsService.update(roomres);

  }

  delete(id: number){ 
    this.roomreservationsService.delete(id);
    window.location.reload();
  }
}